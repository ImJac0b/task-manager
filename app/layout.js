import './styles/globals.css'

export default function Layout({ children }) {
  return (
    <html>
      <body>
        <main className="container mx-auto p-4">
          {children}
        </main>
      </body>
    </html>
  )
}
