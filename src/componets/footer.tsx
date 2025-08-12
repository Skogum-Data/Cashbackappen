export default function Footer() {
  return (
    <footer className="w-full bg-white dark:bg-gray-900 shadow px-4 py-4 flex items-center justify-center mt-4">
      <span className="text-gray-700 dark:text-gray-200 text-sm">
        <span>Denne siden inneholder affiliate lenker. </span> <br /> <br />
        <span>
            &copy; {new Date().getFullYear()} Simen André Vikestrand Skogum. All rights reserved.
            </span>
      </span>
    </footer>
  );
}