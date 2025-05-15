import { useState } from "react";

interface Band {
  id: number;
  name: string;
  votes: number;
}

const exampleList: Band[] = [
  { id: 1, name: "Metallica", votes: 1 },
  { id: 2, name: "Iron Maiden", votes: 3 },
  { id: 3, name: "Black Sabbath", votes: 0 },
];

export const useBandList = () => {
  const [bands, setBands] = useState<Band[]>(exampleList);

  const incrementVote = (id: number) => {
    setBands((prevBands) =>
      prevBands.map((band) =>
        band.id === id ? { ...band, votes: band.votes + 1 } : band
      )
    );
  };

  const decrementVote = (id: number) => {
    setBands((prevBands) =>
      prevBands.map((band) =>
        band.id === id ? { ...band, votes: band.votes - 1 } : band
      )
    );
  };

  const deleteBand = (id: number) => {
    setBands((prevBands) => prevBands.filter((band) => band.id !== id));
  };

  const clearList = () => {
    setBands([]);
  };

  const addBand = (name: string) => {
    const newBand: Band = {
      id: bands.length + 1,
      name,
      votes: 0,
    };
    setBands((prevBands) => [...prevBands, newBand]);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget as HTMLFormElement);
    const bandName = formData.get("band") as string;
    if (bandName) {
      addBand(bandName);
      (event.currentTarget as HTMLFormElement).reset();
    }
  };

  const changeBandName = (id: number, newName: string) => {
    setBands((prevBands) =>
      prevBands.map((band) =>
        band.id === id ? { ...band, name: newName } : band
      )
    );
  };
  return {
    bands,
    incrementVote,
    decrementVote,
    deleteBand,
    clearList,
    handleSubmit,
    changeBandName,
  };
};
