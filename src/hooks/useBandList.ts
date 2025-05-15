import { useContext, useEffect, useState } from "react";
import type { Band } from "../interfaces";
import { SocketContext } from "../context/SocketContext";

export const useBandList = () => {
  const { socket } = useContext(SocketContext);

  const [bands, setBands] = useState<Band[]>([]);

  useEffect(() => {
    socket.on("current-bands", (bands: Band[]) => {
      setBands(bands);
    });

    return () => {
      socket.off("current-bands");
    };
  }, [socket]);

  const incrementVote = (id: string) => {
    socket.emit("increment-votes", id);
  };

  const decrementVote = (id: string) => {
    socket.emit("decrement-votes", id);
  };

  const deleteBand = (id: string) => {
    socket.emit("delete-band", id);
  };

  const clearList = () => {
    socket.emit("clear-bands");
  };

  const addBand = (name: string) => {
    socket.emit("add-band", name);
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

  const changeBandName = (id: string, newName: string) => {
    setBands((prevBands) =>
      prevBands.map((band) => {
        if (band.id === id) {
          return { ...band, name: newName };
        }
        return band;
      })
    );
  };

  const onBlurBandNameInput = (id: string, name: string) => {
    if (name.trim().length > 0) {
      socket.emit("modify-band", { id, name });
      console.log("onBlurBandNameInput", id, name);
    }
  };

  return {
    bands,
    incrementVote,
    decrementVote,
    deleteBand,
    clearList,
    handleSubmit,
    changeBandName,
    onBlurBandNameInput,
  };
};
