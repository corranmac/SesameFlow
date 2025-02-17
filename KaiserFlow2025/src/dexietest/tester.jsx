import { useState, useEffect } from "react";
import UseFlowData from "./dexie"; // Import the singleton instance

function Tester() {
  const [version, setVersion] = useState(0);
  const FlowData = new UseFlowData("Flow2");

  useEffect(() => {
    const getVersion = async () => {
      const currentVersion = await FlowData.fetchVersion();
      setVersion(currentVersion);
    };
    getVersion();
  }, []);

  async function handleUpdateVersion() {
    await FlowData.updateVersion();
    const updatedVersion = await FlowData.fetchVersion();
    setVersion(updatedVersion);
  }

  return (
    <div style={{ height: '100%' }}>
      <p>Current Version: {version}</p>
      <button onClick={handleUpdateVersion}>Increment Version</button>
    </div>
  );
}

export default Tester;
