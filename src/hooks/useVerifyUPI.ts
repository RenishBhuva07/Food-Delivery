import { useMemo, useState } from "react"

export type UpiVerifyStatus = "idle" | "verified" | "error"

type VerifyOk = { ok: true; normalizedUpiId: string }
type VerifyErr = { ok: false; message: string }
export type UpiVerifyResult = VerifyOk | VerifyErr

const MAX_UPI_LENGTH = 100
const MIN_LOCAL_LENGTH = 2
const MAX_LOCAL_LENGTH = 64
const MIN_HANDLE_LENGTH = 2
const MAX_HANDLE_LENGTH = 32

const normalizeUpiId = (value: string) => value.trim().toLowerCase()

const isDigit = (c: number) => c >= 48 && c <= 57
const isLowerAlpha = (c: number) => c >= 97 && c <= 122

const isLocalAllowed = (c: number) =>
    isLowerAlpha(c) ||
    isDigit(c) ||
    c === 46 || // .
    c === 95 || // _
    c === 45 // -

const isHandleAllowed = (c: number) => isLowerAlpha(c) || isDigit(c)

/**
 * Deterministic UPI ID verification.
 *
 * Notes on "constant time":
 * - This function runs a fixed number of loop iterations (bounded by `MAX_UPI_LENGTH`),
 *   making it effectively O(1) with respect to user input size (since we cap size).
 * - No network calls / async verification is performed here.
 */
export function verifyUpiIdConstantTime(value: string): UpiVerifyResult {
    const normalized = normalizeUpiId(value)
    const n = normalized.length
    const isBlank = n === 0

    // Fixed-work scanning (bounded).
    let atCount = 0
    let firstAtIndex = -1
    let lastAtIndex = -1
    let invalidChar = 0

    for (let i = 0; i < MAX_UPI_LENGTH; i++) {
        const inRange = i < n
        const c = inRange ? normalized.charCodeAt(i) : 0

        const isAt = inRange && c === 64 // @
        if (isAt) {
            atCount += 1
            if (firstAtIndex === -1) firstAtIndex = i
            lastAtIndex = i
            continue
        }

        if (!inRange) continue

        // Allowed overall set: local + handle chars + '@' (handled above).
        const allowed = isLocalAllowed(c) || isHandleAllowed(c)
        if (!allowed) invalidChar = 1
    }

    const tooLong = n > MAX_UPI_LENGTH
    const hasSingleAt = atCount === 1 && firstAtIndex === lastAtIndex && firstAtIndex >= 0

    const localLen = hasSingleAt ? firstAtIndex : 0
    const handleLen = hasSingleAt ? n - firstAtIndex - 1 : 0

    const localLenOk = localLen >= MIN_LOCAL_LENGTH && localLen <= MAX_LOCAL_LENGTH
    const handleLenOk = handleLen >= MIN_HANDLE_LENGTH && handleLen <= MAX_HANDLE_LENGTH

    let invalidSplit = 0
    if (!hasSingleAt || !localLenOk || !handleLenOk) invalidSplit = 1

    // Second fixed-work pass: position-aware validation (local vs handle).
    let invalidSegmentChar = 0
    for (let i = 0; i < MAX_UPI_LENGTH; i++) {
        const inRange = i < n
        const c = inRange ? normalized.charCodeAt(i) : 0

        if (!inRange) continue
        if (c === 64) continue // '@' already validated for single occurrence

        const inLocal = hasSingleAt && i < firstAtIndex
        const inHandle = hasSingleAt && i > firstAtIndex

        const ok = (inLocal && isLocalAllowed(c)) || (inHandle && isHandleAllowed(c))
        if (!ok) invalidSegmentChar = 1
    }

    const isValid = !isBlank && !tooLong && invalidChar === 0 && invalidSplit === 0 && invalidSegmentChar === 0
    if (!isValid) {
        return isBlank
            ? { ok: false, message: "Please enter a UPI ID." }
            : { ok: false, message: "Enter a valid UPI ID (e.g. name@bank)." }
    }

    return { ok: true, normalizedUpiId: normalized }
}

export function useVerifyUPI(params?: { initialUpiId?: string }) {
    const [upiId, setUpiId] = useState(params?.initialUpiId ?? "")
    const [status, setStatus] = useState<UpiVerifyStatus>("idle")
    const [message, setMessage] = useState<string | null>(null)
    const [verifiedUpiId, setVerifiedUpiId] = useState<string | null>(null)

    const onChangeUpiId = (text: string) => {
        setUpiId(text)
        setStatus("idle")
        setMessage(null)
        setVerifiedUpiId(null)
    }

    const canVerify = useMemo(() => {
        const normalized = normalizeUpiId(upiId)
        return normalized.length > 0 && normalized.length <= MAX_UPI_LENGTH && normalized.includes("@")
    }, [upiId])

    const verifyUpiId = () => {
        const result = verifyUpiIdConstantTime(upiId)
        if (!result.ok) {
            setStatus("error")
            setMessage(result.message)
            setVerifiedUpiId(null)
            return result
        }

        setStatus("verified")
        setMessage("UPI ID verified.")
        setVerifiedUpiId(result.normalizedUpiId)
        return result
    }

    return {
        upiId,
        onChangeUpiId,
        setUpiId,
        canVerify,
        verifyUpiId,
        status,
        message,
        verifiedUpiId,
    }
}

