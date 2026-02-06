export default function SearchBar({ placeholder, buttonLabel }: { placeholder: string; buttonLabel: string }) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <input
        className="w-full flex-1 rounded-2xl border border-stone-200 bg-white px-5 py-3 text-sm shadow-sm focus:border-orange-500 focus:outline-none"
        placeholder={placeholder}
        type="search"
      />
      <button className="rounded-2xl bg-stone-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-700">
        {buttonLabel}
      </button>
    </div>
  );
}
