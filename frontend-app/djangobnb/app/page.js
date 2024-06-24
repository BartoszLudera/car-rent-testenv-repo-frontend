import Categories from "./components/Categories";
import PropertiesList from "./components/properties/PropertiesList";

export default function Home() {
  return (
    <main className="max-w-[1500px] mx-auto px-6">
      <Categories/>
      <div >
        <PropertiesList />
      </div>
    </main>
  );
}
