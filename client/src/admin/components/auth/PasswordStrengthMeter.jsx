export function evaluatePasswordStrength(password = '') {
  const checks = {
    length: password.length >= 8,
    upper: /[A-Z]/.test(password),
    lower: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[^A-Za-z0-9]/.test(password),
  };
  const score = Object.values(checks).filter(Boolean).length;
  const label =
    score <= 2 ? 'Weak' : score === 3 ? 'Fair' : score === 4 ? 'Good' : 'Strong';
  const color =
    score <= 2
      ? 'bg-[#B93627]'
      : score === 3
      ? 'bg-amber-500'
      : 'bg-emerald-600';

  return { checks, score, label, color };
}

export default function PasswordStrengthMeter({ password = '' }) {
  if (!password) return null;
  const { checks, score, label, color } = evaluatePasswordStrength(password);

  return (
    <div className="mt-2 space-y-1.5">
      <div className="flex items-center justify-between text-[11px]">
        <span className="text-[#77736B]">Password strength</span>
        <span className="font-semibold text-[#34332C]">{label}</span>
      </div>
      <div className="grid grid-cols-5 gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className={`h-1 rounded-full ${
              i < score ? color : 'bg-[#E9E1D5]'
            }`}
          />
        ))}
      </div>
      <ul className="grid grid-cols-2 gap-x-2 gap-y-0.5 pt-1 text-[10px] text-[#77736B]">
        <li className={checks.length ? 'text-emerald-700' : ''}>• 8+ characters</li>
        <li className={checks.upper ? 'text-emerald-700' : ''}>• Uppercase letter</li>
        <li className={checks.lower ? 'text-emerald-700' : ''}>• Lowercase letter</li>
        <li className={checks.number ? 'text-emerald-700' : ''}>• Number</li>
      </ul>
    </div>
  );
}
