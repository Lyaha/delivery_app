export const Footer = () => {
  return (
    <footer className="bg-gray-100 border-t text-sm text-gray-600">
      <div className="container mx-auto px-4 py-6 flex flex-col sm:flex-row justify-between items-center gap-2">
        <p>&copy; {new Date().getFullYear()} DeliApp. Все права защищены.</p>
        <div className="flex gap-4">
          <a href="#" className="hover:text-blue-600 transition">Политика</a>
          <a href="#" className="hover:text-blue-600 transition">Контакты</a>
        </div>
      </div>
    </footer>
  )
}
