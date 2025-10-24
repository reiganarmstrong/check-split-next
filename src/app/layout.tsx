import "./globals.css";
import NavBar from "./_components/navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="h-[100vh]">
        <div className="pl-10 pr-10 pb-15 font-serrif text-primary h-full min-h-[820px] flex flex-col">
          <NavBar />
          {children}
        </div>
      </body>
    </html>
  );
}
