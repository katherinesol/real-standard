function WarningBanner() {
  return (
    <div className="inline-block border-3 border-black bg-[#fafaf8] p-6 max-w-sm text-left">
      <p className="font-display text-xl tracking-wide mb-3">WARNING</p>
      <p className="text-xs leading-relaxed text-gray-700">
        This is a real food only experience — no preservatives, no refined
        sugar, no seed oils, no artificial flavours, no vague "natural
        flavours," no synthetic additives, and no emulsifiers found in any
        of our approved products.
      </p>
    </div>
  )
}

export default WarningBanner