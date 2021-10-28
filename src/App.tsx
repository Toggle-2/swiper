import "./App.css";
import { Slide, SlideShow } from "./components/Slides";

const CONTACTS_DATA = [
  {
    name: "Brandon Strong",
    number: "1 (555) 555-5555",
    _id: 0,
  },
  {
    name: "Susan Rice",
    number: "1 (675) 444-4444",
    _id: 1,
  },
  {
    name: "Brandy Richards",
    number: "1 (923) 005-0000",
    _id: 2,
  },
  {
    name: "Greg Ronald",
    number: "1 (573) 155-0001",
    _id: 3,
  },
  {
    name: "Donald Perry",
    number: "1 (751) 657-2748",
    _id: 4,
  },
  {
    name: "Ned Stinson",
    number: "1 (565) 122-0929",
    _id: 5,
  },
  {
    name: "Leah Ovald",
    number: "1 (065) 844-1892",
    _id: 6,
  },
];

function App() {
  return (
    <div className="App">
      <SlideShow lastSlideIndex={CONTACTS_DATA.length - 1} slideSpacing={100}>
        {CONTACTS_DATA.map((contact) => {
          const index = CONTACTS_DATA.findIndex((item) => {
            return item._id === contact._id;
          });
          return (
            <Slide key={contact._id} index={index} spacing={100}>
              <div className="card">
                <h1>{contact.name}</h1>
                <h2>{contact.number}</h2>
              </div>
            </Slide>
          );
        })}
      </SlideShow>
    </div>
  );
}

export default App;
