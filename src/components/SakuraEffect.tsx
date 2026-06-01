export default function SakuraEffect() {
  return (
    <div className="sakura-container pointer-events-none absolute inset-0 z-0" aria-hidden="true">
      {Array.from({ length: 12 }, (_, index) => (
        <span key={index} className={`petal petal-${index + 1}`} />
      ))}
    </div>
  )
}
