import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Sẽ thêm routes dần theo từng phase */}
        <Route path="/" element={<div>TechShop - Trang chủ (Phase 4)</div>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
