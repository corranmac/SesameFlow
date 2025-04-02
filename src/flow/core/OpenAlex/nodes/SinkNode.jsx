import React, { useCallback, useEffect, useMemo, useState } from 'react';

import BasicNode from "@flowcore/base/nodes/SinkType"
import useFlowStore from '@flowstate/store';
import getAllIncomers from '@flowcore/utils/getAllIncomers';
import { MdOutlineQueryStats } from "react-icons/md";
import { MdInfoOutline } from "react-icons/md";
import { MdLibraryBooks } from "react-icons/md";
import { processOpenAlexObject } from '../data/DCMapper';
import { useDatabase } from '@/dexie-test/DataCiteStore';
import { Progress, useProgress } from '@ark-ui/react/progress'


export const Loader = ({ value=50, min = 0, max = 100, label = 'Progress' }) => {
    const progress = useProgress()
    return (
        <div 
        className="w-4 h-4 border-2 border-black border-b-transparent rounded-full animate-spin">
        </div>
    );
  };

const SinkNode = ({ id }) => {

    const baseQuery = "https://api.openalex.org/works?per-page=20&filter=" ///&select=id

    const { nodes, edges } = useFlowStore((state) => ({
        nodes: state.nodes,
        edges: state.edges,
    }));

    const [articleCount, setArticleCount] = useState()
    const [isQuerying, setIsQuerying] = useState(false)
    const [adata,setaData] = useState()

    const { db, isLoading, error } = useDatabase();
    const [dataAdded, setDataAdded] = useState(false); // Track if the data has been added

    const handleAddData = async (articleData) => {
        if (db) {
        try {
            // Insert the data into the database
            await db.metadata.add(articleData);

            // Query the data after insertion
            const yearData = await db.metadata.toArray();

            // Set state to indicate data has been added
            setDataAdded(true);
        } catch (err) {
            console.error("Error adding data:", err);
        }
        }
    };

    const callOA=()=>{
        setIsQuerying(true)
        let queryData = incomers.map(node => node.data)
        
        let queryParts = queryData.map(data => data.filter +":" + data.filter_value)
        let query = queryParts.join(",")

        fetch(baseQuery + query)
        .then((response) => {
            if (response.ok) {
                return response.json();  // Return the parsed JSON data
            } else {
                throw new Error('Something went wrong!');
            }
        })
        .then((data) => {
            setaData(data)
        })
        .catch((error) => {
            console.error(error);  // Handle any errors that occur
        });
    }

    function logArticle(){
        if (adata){
            let data = Object(adata)
            setArticleCount(data.meta.count)
            if (data.results[0]){
                for (let article of data.results){
                    const articleData = processOpenAlexObject(article)
                    handleAddData(articleData)
                }
            }
            setIsQuerying(false)
        }
    }

    useEffect(()=>logArticle(),[adata])

    const incomers = useMemo(()=>getAllIncomers(id,nodes,edges),[nodes,edges])

    return (
        <BasicNode type={SinkNode.name} group={SinkNode.group} key={id}>
            <div className="flex flex-col flex-grow items-stretch justify-between">
                <div className="flex flex-grow justify-center items-center text-xl">
                    {isQuerying ? <Loader /> 
                    : `n = ${articleCount ? articleCount.toLocaleString() : "?"}`}

                </div>
                <div className="flex flex-shrink flex-row justify-center border-t-2 rounded-b-md gap-4 text-2xl px-2 py-2 items-center">
                    <MdOutlineQueryStats className="border-1 border-black rounded-sm text-4xl bg-green-100" onClick={()=>callOA()}/>
                    <MdLibraryBooks className="border-1 border-black rounded-sm text-4xl"/>
                    <MdInfoOutline className="border-1 border-black rounded-sm text-4xl"/>
                </div>
            </div>
        </BasicNode>
    );
};

// Define the node type
SinkNode.source = 'OpenAlex';
SinkNode.group = 'Repository';
SinkNode.label = 'sink';
SinkNode.type = 'Computation';


export default SinkNode;

