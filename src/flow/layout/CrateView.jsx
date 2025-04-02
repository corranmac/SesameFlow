import {crate_json} from "@flow/representation/ro-crate.ts"
import {JsonInspector} from '@rexxars/react-json-inspector'

const CrateView = ({flowName}) =>{
    return(
    <div className="flex flex-col">
        <h3>RO-Crate Representation</h3>
        <p>The data and metadata for research flows are stored and shareable as Research Object Crates (RO-Crates). 
            The RO-Crate is a community-driven standard for packaging and sharing research data, metadata, and associated resources in a structured, machine-readable format.</p>
        <div className="flex flex-col gap-2 mt-2 p-1 border-l-2">
        <h6>{flowName} RO-Crate</h6>
        <JsonInspector data={crate_json}/>
        </div>
    </div>
    )
}

export default CrateView