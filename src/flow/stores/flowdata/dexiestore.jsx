import Dexie from 'dexie';

class UseFlowData {
  constructor(flowID) {
    this.flowID = flowID;  // Store the user ID
    // Create a unique database name using the userID
    this.db = new Dexie(`FlowData_${flowID}`);

    this.db.version(1).stores({
      versions: "id, version", // Store service node metadata
    });

    // Initialize the versions table if it doesn't exist
    this.db.versions.get(0).then(entry => {
      if (!entry) {
        this.db.versions.put({ id: 0, version: 0 }).catch(() => {});
      }
    });
  }

  async fetchVersion() {
    const entry = await this.db.versions.get(0);
    return entry ? entry.version : 0;
  }

  async updateVersion() {
    const currentVersion = await this.fetchVersion();
    const newVersion = currentVersion + 1;
    await this.db.versions.put({ id: 0, version: newVersion });
  }

  async addProvider(provider, data) {
    const currentVersion = await this.fetchVersion();
    const newVersion = currentVersion + 1;

    this.db.version(newVersion).stores({
      [provider]: "doi", // Assuming 'doi' is the unique key for your provider
    });

    await this.db[provider].put(data);
    await this.updateVersion();
  }
}

export default UseFlowData;
