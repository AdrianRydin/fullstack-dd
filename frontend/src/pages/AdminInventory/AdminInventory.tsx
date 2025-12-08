import "./AdminInventory.css"

function AdminInventoryPage() {
  return (
    <section className="wrapper">
      <h1 className="title">Inventory</h1>

      <section className="category-card">
        <h2 className="title">Fish and Seafood</h2>
        <section className="row-wrapper">
          <section className="item-wrapper">
            <h3 className="title">Item</h3>
            <p>Salmon</p>
            <p>Salmon</p>
            <p>Salmon</p>
            <p>Salmon</p>
          </section>
          <section className="qty-wrapper">
            <h3 className="title">Quantity</h3>
            <p>2</p>
            <p>2</p>
            <p>2</p>
            <p>2</p>
          </section>
        </section>
      </section>

      <section className="category-card">
        <h2 className="title">Rice and base ingredients</h2>
        <section className="row-wrapper">
          <section className="item-wrapper">
            <h3 className="title">Item</h3>
            <p>Salmon</p>
            <p>Salmon</p>
            <p>Salmon</p>
            <p>Salmon</p>
          </section>
          <section className="qty-wrapper">
            <h3 className="title">Quantity</h3>
            <p>2</p>
            <p>2</p>
            <p>2</p>
            <p>2</p>
          </section>
        </section>
      </section>
    </section>
  )
}

export default AdminInventoryPage
