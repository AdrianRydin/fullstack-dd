import "./MenuFilter.css"

type Props = {
  filter: string
  setFilter: (value: string) => void
}

const FILTERS = ["Nigiri", "Maki", "Special", "Drink","All"]

function MenuFilter({ filter, setFilter }: Props) {
  return (
    <section className="filter-buttons-wrapper">
      {FILTERS.map((f) => (
        <button
          key={f}
          className={filter === f ? "active" : ""}
          onClick={() => setFilter(f)}
        >
          {f}
        </button>
      ))}
    </section>
  )
}

export default MenuFilter
