import React, { useEffect, useState } from 'react';

import {
    Card,
    Typography,
    List,
    ListItem,
    ListItemPrefix
} from "@material-tailwind/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import axiosInstance from '../axiosInstance';

const FolderTree = ({ onFolderClick }) => {
    const [folders, setFolders] = useState([]); // tampung folder utama
    const [openFolderIds, setOpenFolderIds] = useState([]); // tampung folder yang expanded
    const [folderChildren, setFolderChildren] = useState({}); // untuk menampung subfolder
    const [searchTerm, setSearchterm] = useState('')

    const toggleFolder = (folder) => {
        const folderId = folder.id;

        // Tututp folder jika kebuka
        if (openFolderIds.includes(folderId)) {
            setOpenFolderIds((prev) => prev.filter((id) => id !== folderId));
        } else {
            // expand folder
            setOpenFolderIds((prev) => [...prev, folderId]);

            // Get subfolder jika belum ada di state
            if (!folderChildren[folderId]) {
                axiosInstance
                    .get(`/api/folders/${folderId}/subfolder`)
                    .then((response) => {
                        setFolderChildren((prev) => ({
                            ...prev,
                            [folderId]: response.data,
                        }));
                    })
                    .catch((error) => console.error(error));
            }
        }
    };

    const handleChange = (event) => {
        setSearchterm(event.target.value)
    }
    const handleSearch = (event) => {
        console.log('searchTerm', searchTerm)
        axiosInstance
            .get('/api/folders', {
                params: {
                    search:searchTerm
                }
            })
            .then((response) => setFolders(response.data))
            .catch((error) => console.error(error));
    }

    useEffect(() => {
        // get parent folder ketika init
        axiosInstance
            .get('/api/folders')
            .then((response) => setFolders(response.data))
            .catch((error) => console.error(error));
    }, []);

    const renderFolders = (folders) => {
        
        // console.log('folders', folders)
        // console.log('folderChildren', folderChildren)
        // console.log('openFolderIds', openFolderIds)
        return folders.map((folder) => (
            <List key={folder.id} className="p-0">
                <ListItem className="flex items-center">
                    <ListItemPrefix>
                        <ChevronDownIcon
                            className={`h-5 w-5 cursor-pointer transition-transform ${
                                openFolderIds.includes(folder.id) ? 'rotate-180' : ''
                            }`}
                            onClick={() => toggleFolder(folder)}
                        />
                    </ListItemPrefix>
                    <Typography onClick={() => onFolderClick(folder.id)} className="cursor-pointer">
                        {folder.name}
                    </Typography>
                </ListItem>
                {openFolderIds.includes(folder.id) && folderChildren[folder.id] && (
                    <div className="ml-4">{renderFolders(folderChildren[folder.id])}</div>
                )}
            </List>
        ));
    };

    return (
        <div>
            <Card className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
                <div className="mb-2 p-4">
                    
                    <input
                        type="text"
                        placeholder="Search"
                        value={searchTerm}
                        onChange={handleChange}
                    />
                     <button
                        onClick={handleSearch}
                        style={{
                        padding: '8px 16px',
                        backgroundColor: '#4CAF50',
                        color: 'white',
                        border: 'none',
                        cursor: 'pointer',
                        }}
                    >
                        Search
                    </button>
                    <Typography variant="h5" color="blue-gray">
                        Explorer
                    </Typography>
                </div>
                {renderFolders(folders)}
            </Card>
        </div>
    );
};


export default FolderTree;