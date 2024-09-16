import './styles/globals.css'

export default function Layout({ children }) {
  return (
    <html>
    <head>
      <title>Task Manager</title>
    </head>
      <body className="bg-gray-10">
        <main className="container mx-auto p-4 bg-gray-10">
          {children}
        </main>
      </body>
    </html>
  )
}
