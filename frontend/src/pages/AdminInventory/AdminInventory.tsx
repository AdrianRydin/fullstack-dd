import "./AdminInventory.css"

function AdminInventoryPage() {
  return (
    <section className="wrapper">
      <h1 className="title">Inventory</h1>

      <section className="category-card">
        <h2 className="title">Fish and Seafood</h2>
        <section className="titles-wrapper">
          <h3 className="title">Item</h3>
          <h3 className="title">Quantity</h3>
        </section>
        <section className="item-wrapper">
          {/* här ska vi mappa alla items som finns i backend */}
          <p>Salmon</p>
          <p>2</p>
        </section>
        <section className="item-wrapper">
          {/* här ska vi mappa alla items som finns i backend */}
          <p>Salmon</p>
          <p>2</p>
        </section>
        <section className="item-wrapper">
          <p>Salmon</p>
          <p>2</p>
        </section>
        <section className="item-wrapper">
          <p>Salmon</p>
          <p>2</p>
        </section>
      </section>

      <section className="category-card">
        <h2 className="title">Rice and base ingredients</h2>
        <section className="titles-wrapper">
          <h3 className="title">Item</h3>
          <h3 className="title">Quantity</h3>
        </section>
        <section className="item-wrapper">
          {/* här ska vi mappa alla items som finns i backend */}
          <p>Salmon</p>
          <p>2</p>
        </section>
      </section>
    </section>
  )
}

export default AdminInventoryPage
