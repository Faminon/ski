import SearchBar from "@/components/SearchBar";

export default function HomePage() {
  return (
    <main
      style={{
        minHeight: "60vh",
        display: "grid",
        placeItems: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 760,
          margin: "0 auto",
          padding: 16,
        }}
      >
        <SearchBar />
      </div>
    </main>
  );
}
