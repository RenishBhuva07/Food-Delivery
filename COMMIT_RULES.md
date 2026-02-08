# Cursor Commit Message Rules

This file defines **mandatory rules** for generating commit messages.
Cursor (and any AI assistant) MUST follow these rules when creating commit messages
based on **recent changes or staged changes**.

---

## 🚫 IMPORTANT OVERRIDE

- ❌ Conventional commit formats like `feat:`, `fix:`, `refactor:` are **NOT allowed**
- ✅ ONLY use **UPPERCASE prefixes inside square brackets**
- ✅ Prefix MUST end with a colon `:`

---

## ✅ Allowed Commit Prefixes (STRICT)

### 🚀 Feature
Use when introducing a new feature or user-facing functionality.
```
[FEAT]: Description of the new feature
```
or
```
[ADD]: Description of the new feature
```
Example: `[FEAT]: Add and configure a comprehensive set of iOS app icons`

### 🐛 Bug Fix
Use when fixing bugs or issues.
```
[FIX]: Description of the bug fix
```
Example: `[FIX]: Resolve authentication token expiration issue`

### 🔄 Refactor
Use when refactoring code without changing functionality.
```
[REFACTOR]: Description of the refactoring
```
Example: `[REFACTOR]: Restructure component folder organization`

### 📚 Documentation
Use when updating or adding documentation.
```
[DOCS]: Description of documentation changes
```
Example: `[DOCS]: Update README with setup instructions`

### 🎨 Style
Use when making style, formatting, or UI adjustments.
```
[STYLE]: Description of styling changes
```
Example: `[STYLE]: Update color scheme for dark mode support`

### ✅ Test
Use when adding or modifying tests.
```
[TEST]: Description of test changes
```
Example: `[TEST]: Add unit tests for authentication module`

### ⚙️ Configuration
Use when updating configuration files or build setup.
```
[CONFIG]: Description of configuration changes
```
Example: `[CONFIG]: Update Vite build optimization settings`

### 🚀 Deploy
Use when deploying or preparing for production.
```
[DEPLOY]: Description of deployment changes
```
Example: `[DEPLOY]: Prepare for v2.0 production release`

### 🧹 Chore
Use for maintenance tasks that don't affect the code (e.g., build scripts, package updates).
```
[CHORE]: Description of chore
```
Example: `[CHORE]: Update npm dependencies`

### ⚡ Performance
Use for performance improvements.
```
[PERF]: Description of performance improvement
```
Example: `[PERF]: Optimize image loading logic`

---

## 📋 Format Rules

- Prefix MUST be wrapped in **square brackets**: `[PREFIX]:`
- Prefix MUST be in **UPPERCASE**
- MUST include a colon after the closing bracket
- Description should be **concise and clear**
- Use **imperative mood** (e.g., "Add", "Fix", "Update", not "Added", "Fixed", "Updated")

---

## 🎯 Example Commit Messages

✅ **CORRECT:**
- `[ADD]: Implement dark mode theme toggle`
- `[FIX]: Correct alignment issue in mobile view`
- `[REFACTOR]: Simplify state management logic`
- `[DOCS]: Add API documentation for endpoints`
- `[FEAT]: Add new screens and features`

❌ **INCORRECT:**
- `ADD: Implement dark mode` (no square brackets)
- `add: Implement dark mode` (not uppercase)
- `[add] Implement dark mode` (not uppercase)
- `feat: Implement dark mode` (conventional commit format not allowed)

