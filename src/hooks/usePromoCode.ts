import { useEffect, useMemo, useState } from "react"

export type PromoRule =
    | { code: string; type: "percent"; value: number; maxDiscount?: number; minSubtotal?: number }
    | { code: string; type: "amount"; value: number; minSubtotal?: number }

export type PromoStatus = { type: "success" | "error"; message: string }

const DEFAULT_PROMO_RULES: PromoRule[] = [
    { code: "SAVE10", type: "percent", value: 10, maxDiscount: 15000, minSubtotal: 20000 },
    { code: "FLAT5000", type: "amount", value: 5000, minSubtotal: 30000 },
]

const normalizePromo = (value: string) => value.trim().toUpperCase()

export function usePromoCode(params: { subtotal: number; rules?: PromoRule[] }) {
    const { subtotal, rules = DEFAULT_PROMO_RULES } = params

    const [promoCode, setPromoCode] = useState("")
    const [appliedPromo, setAppliedPromo] = useState<PromoRule | null>(null)
    const [promoStatus, setPromoStatus] = useState<PromoStatus | null>(null)

    const discount = useMemo(() => {
        if (!appliedPromo) return 0

        const minSubtotal = appliedPromo.minSubtotal ?? 0
        if (subtotal <= 0 || subtotal < minSubtotal) return 0

        let computed = 0
        if (appliedPromo.type === "percent") {
            computed = Math.round((subtotal * appliedPromo.value) / 100)
            if (typeof appliedPromo.maxDiscount === "number") computed = Math.min(computed, appliedPromo.maxDiscount)
        } else {
            computed = appliedPromo.value
        }

        return Math.max(0, Math.min(computed, subtotal))
    }, [appliedPromo, subtotal])

    const total = useMemo(() => Math.max(0, subtotal - discount), [subtotal, discount])

    const onChangePromoCode = (text: string) => {
        setPromoCode(text)
        setPromoStatus(null)
        if (appliedPromo) setAppliedPromo(null)
    }

    const applyPromoCode = () => {
        const normalized = normalizePromo(promoCode)
        if (!normalized) {
            setPromoStatus({ type: "error", message: "Please enter a promo code." })
            setAppliedPromo(null)
            return
        }

        if (subtotal <= 0) {
            setPromoStatus({ type: "error", message: "Select at least one item to apply a promo code." })
            setAppliedPromo(null)
            return
        }

        const rule = rules.find((r) => r.code === normalized)
        if (!rule) {
            setPromoStatus({ type: "error", message: "Invalid promo code." })
            setAppliedPromo(null)
            return
        }

        const minSubtotal = rule.minSubtotal ?? 0
        if (subtotal < minSubtotal) {
            setPromoStatus({ type: "error", message: `Add items worth $${minSubtotal.toLocaleString()} to use this code.` })
            setAppliedPromo(null)
            return
        }

        setPromoCode(rule.code)
        setAppliedPromo(rule)
        setPromoStatus({ type: "success", message: `${rule.code} applied successfully.` })
    }

    const removePromoCode = () => {
        setPromoCode("")
        setAppliedPromo(null)
        setPromoStatus(null)
    }

    useEffect(() => {
        if (!appliedPromo) return
        const minSubtotal = appliedPromo.minSubtotal ?? 0
        if (subtotal <= 0) {
            setAppliedPromo(null)
            setPromoStatus({ type: "error", message: "Select at least one item to apply a promo code." })
            return
        }
        if (subtotal < minSubtotal) {
            setAppliedPromo(null)
            setPromoStatus({ type: "error", message: `Add items worth $${minSubtotal.toLocaleString()} to use this code.` })
        }
    }, [appliedPromo, subtotal])

    return {
        promoCode,
        setPromoCode,
        onChangePromoCode,
        appliedPromo,
        promoStatus,
        discount,
        total,
        applyPromoCode,
        removePromoCode,
    }
}

