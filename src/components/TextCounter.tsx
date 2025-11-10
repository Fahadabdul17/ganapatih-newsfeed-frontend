export default function TextCounter({ value, max }: { value: string; max: number }) {
  const left = max - value.length
  const danger = left < 0


  return (
    <div className={`text-right text-xs ${danger ? 'text-red-400' : 'text-slate-400'}`}>{left} / {max}</div>
  )
}