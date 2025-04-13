import { useDatabase } from "./DataCiteStore";
import { useState } from "react";

function Tester() {
  const { db, isLoading, error } = useDatabase();
  const [dataAdded, setDataAdded] = useState(false); // Track if the data has been added

  const handleAddData = async () => {
    if (db) {
      try {
        // Insert the data into the database
        await db.metadata.add({
          id: "4444",
          Identifier: { identifier: "doi:10.1234/abcd", identifierType: "DOI" },
          Creators: [{ name: "Alice" }, { name: "Bob" }],
          Titles: [{ title: "Research Paper" }],
          Publisher: { name: "SciencePress" },
          PublicationYear: "2024",
          ResourceType: { resourceType: "paper", resourceTypeGeneral: "JournalArticle" },
          Sizes: ["10MB"],
          Format: "PDF",
          Version: "1.0",
          Rights: { rights: "CC-BY" },
          Description: [{ description: "A study on climate change", descriptionType: "Other" }],
          GeoLocation: [{ geoLocationPoint: { pointLongitude: 10, pointLatitude: 20 } }],
          FundingReferences: [{ funderName: "NSF" }],
        });

        // Query the data after insertion
        const yearData = await db.metadata.where("PublicationYear").equals("2024").toArray();
        console.log(JSON.stringify(yearData)); // Log the data for verification

        // Set state to indicate data has been added
        setDataAdded(true);
      } catch (err) {
        console.error("Error adding data:", err);
      }
    }
  };

  return (
    <div style={{ height: "100%" }}>
      <p>Current Version: 1.0</p>
      {isLoading && <p>Loading database...</p>}
      {error && <p>Error: {error.message}</p>}

      {/* Only show the button once the DB is loaded */}
      {!isLoading && !error && !dataAdded && (
        <button onClick={handleAddData}>Add Data to Database</button>
      )}

      {/* Show message after data is added */}
      {dataAdded && <p>Data added successfully!</p>}
    </div>
  );
}

export default Tester;
