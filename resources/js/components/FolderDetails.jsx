import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Typography } from '@material-tailwind/react';

const FolderDetails = ({ folderId }) => {
    const [subfolders, setSubfolders] = useState([]);

    useEffect(() => {
        // Fetch subfolders for the selected folder
        axios.get(`/api/folders/${folderId}`)
            .then((response) => setSubfolders(response.data))
            .catch((error) => console.error(error));
    }, [folderId]);

    return (
        <div>
            <Typography variant="h5" color="blue-gray">
                Subfolders And Files
            </Typography>
            {subfolders?.children?.length > 0 || subfolders?.files?.length > 0 ? (
                <ul>
                    {subfolders?.children.map(folder => (
                        <li key={folder.id}>{folder.name}</li>
                    ))}
                    
                    {subfolders?.files?.map(file => (
                        <li key={file.id}>{file.name}</li>
                    ))}
                </ul>
                
            ) : (
                <p>No subfolders or file available</p>
            )}
        </div>
    );
};

export default FolderDetails;
