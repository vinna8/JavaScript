import { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { createDirectory, deleteDirectory, deleteFile, download, infoFiles } from '../redux/actions';
import * as selectors from '../redux/selectors';
import { BiDownload, BiArrowBack, BiFolderMinus, BiFolderPlus, BiTrash } from "react-icons/bi";

const Table = () => {
    const dispatch = useDispatch(); 
    const files = useSelector(selectors.files); 
    const prevDir = useSelector(selectors.prevDir);
    const currDir = useSelector(selectors.currDir);
    
    useEffect(() => { 
            dispatch(infoFiles(''));
    }, [])

    return (
        <div>
            <TableWrap>
                <thead>
                    <tr>
                        <Th>Name</Th>
                        <Th>Type</Th>
                        <Th>Size</Th>
                        <Th>Last modified</Th>
                        <Th>Downloud</Th>
                        <Th>Delete</Th>
                    </tr>
                </thead>

                {files && files.map((file) =>
                    <tbody key={file.file}>
                        <tr>
                            <Td>{(file.type != 'Directory') 
                                ? <a href={`http://localhost:3001/${file.pathFileShort}`}>{file.file}</a> 
                                : <a href='#' onClick={() => {dispatch(infoFiles(file.pathFileShort))}}>{file.file}</a>}</Td>
                            <Td>{file.type}</Td>
                            <Td>{(file.size != '-') ? (file.size + 'Bytes') : (file.size)}</Td> 
                            <Td>{file.modification.replace(/T/, ' ').replace(/\..+/, '')}</Td>
                            <Td>{(file.type != 'Directory') ? <BiDownload style={{color: '#000000', cursor: 'pointer'}} onClick={() => {dispatch(download(file.pathFileShort))}}/> : ''}</Td>
                            <Td>{(file.type != 'Directory') ? <BiTrash style={{color: '#000000', cursor: 'pointer'}} onClick={() => {dispatch(deleteFile(file.pathFileShort)); window.location.reload()}}/> : ''}</Td>
                        </tr>
                    </tbody>
                )}
            </TableWrap>

            {currDir && currDir != '' 
                    ? <Action onClick={() => {dispatch(infoFiles(prevDir))}}> 
                        <BiArrowBack style={{marginRight: '10px', color: '#000000'}}/> 
                        Back
                    </Action>
                    : ''
            }

            <Action onClick={() => {dispatch(createDirectory(prevDir + '\\' + currDir + '\\' + parseInt((Math.random() * 10000000000000000)).toString(36))); window.location.reload()}}>
                <BiFolderPlus style={{marginRight: '10px', color: '#000000'}}/>
                Create a new directory
            </Action>

            {files == '' 
                ? <Action onClick={() => {dispatch(deleteDirectory(prevDir + '\\' + currDir)); window.location.reload()}}>
                    <BiFolderMinus style={{marginRight: '10px', color: '#000000'}}/>
                    Delete an empty directory
                </Action>
                : ''
            }
		</div>
    )
}

export default Table;

const TableWrap = styled.table`
    margin: auto;
    width: 100%;
    border-radius: 25px;
    background: #FFFFFF;
    text-align: center;
    border-collapse: collapse;
`

const Action = styled.div`
    margin-top: 10px;
    margin-bottom: 8px;
    margin-left: 30px;
    cursor: pointer;
`

const Th = styled.th`
    padding: 15px;
    background: #bbbbbb;
`

const Td = styled.td`
    padding: 10px;
`