import React, { useEffect, useState } from 'react';
import axios from 'axios';

import {
    Card,
    Typography,
    List,
    ListItem,
    ListItemPrefix,
    Accordion,
    AccordionHeader,
    AccordionBody,
} from "@material-tailwind/react";
import {
    PresentationChartBarIcon,
} from "@heroicons/react/24/solid";
import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/24/outline";

const FolderTree = ({ onFolderClick }) => {
    const [folders, setFolders] = useState([]);
    const [openFolderId, setOpenFolderId] = useState(null);
    const [folderChildren, setFolderChildren] = useState({});

    const handleOpen = (folder) => {
        const folderId = folder.id;
        if (openFolderId === folderId) {
            setOpenFolderId(null);
        } else {
            setOpenFolderId(folderId);
            if (!folderChildren[folderId]) {
                axios.get(`/api/folders/${folderId}/subfolder`)
                    .then((response) => {
                        setFolderChildren(prev => ({
                            ...prev,
                            [folderId]: response.data
                        }));
                    })
                    .catch((error) => console.error(error));
            }
        }
    };

    useEffect(() => {
        axios.get('/api/folders')
            .then((response) => setFolders(response.data))
            .catch((error) => console.error(error));
    }, []);

    // Depreacated
    const renderFolders = (folders) => {
        return folders.map(folder => (
            <li key={folder.id} style={{ cursor: 'pointer' }}>
                <div onClick={() => onFolderClick(folder.id)}>
                    {folder.name}
                </div>
                {folder.children && folder.children.length > 0 && (
                    <ul>{renderFolders(folder.children)}</ul>
                )}
            </li>
        ));
    };

    const renderParentFolders = (folders) => {
        return folders.map(folder => (
            <Accordion
                key={folder.id}
                open={openFolderId === folder.id}
                icon={
                    <ChevronDownIcon onClick={() => handleOpen(folder)} 
                        strokeWidth={2.5}
                        className={`mx-auto h-4 w-4 transition-transform ${openFolderId === folder.id ? "rotate-180" : ""}`}
                    />
                }
            >
                { folder.children && folder.children.length > 0 ? (
                    <div>
                        <ListItem className="p-0">
                            <AccordionHeader onClick={() => onFolderClick(folder.id)} className="border-b-0 p-3">
                                <ListItemPrefix>
                                    <PresentationChartBarIcon className="h-5 w-5" />
                                </ListItemPrefix>
                                <Typography color="blue-gray" className="font-normal">
                                    {folder.name}
                                </Typography>
                            </AccordionHeader>
                        </ListItem>
                        <AccordionBody className="py-1">
                            {folderChildren[folder.id] && folderChildren[folder.id].length > 0 ? (
                                renderParentFolders(folderChildren[folder.id])
                            ) : (
                                <p>No subfolders</p>
                            )}
                        </AccordionBody>
                        <hr className="my-2 border-blue-gray-50" />
                    </div>
                ) 
                :
                (
                    <List className="p-0">
                        <ListItem onClick={() => onFolderClick(folder.id)} >
                            <ListItemPrefix>
                            <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                            </ListItemPrefix>
                            {folder.name}
                        </ListItem>
                    </List>
                )
                }
            </Accordion>
        ));
    }

    return (
        <div>
            <Card className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
                <div className="mb-2 p-4">
                    <Typography variant="h5" color="blue-gray">
                        Explorer
                    </Typography>
                </div>
                <List>
                    {renderParentFolders(folders)}
                </List>
            </Card>
        </div>
    );
};

export default FolderTree;