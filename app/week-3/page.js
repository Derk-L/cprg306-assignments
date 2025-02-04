import ItemList from './item-list.js';

export default function Page() {
    return (
      <main className="bg-blue-100">
        <h1 className="text-3xl font-extrabold ml-2">Shopping 
        <span className="text-blue-600">List</span></h1>
        <ItemList></ItemList>
      </main>
    );
};