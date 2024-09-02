import "@spectrum-web-components/theme/express/scale-medium.js";
import "@spectrum-web-components/theme/express/theme-light.js";
import {Button} from "@swc-react/button";
import {Theme} from "@swc-react/theme";
import React, {useEffect, useRef, useState} from "react";
import "./App.css";
import {ButtonGroup} from '@swc-react/button-group';
import {FieldLabel} from '@swc-react/field-label';
import {Slider} from '@swc-react/slider';
import {Swatch} from '@swc-react/swatch';
import {NumberField} from '@swc-react/number-field';
import { AddOnSDKAPI } from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";
import {editor} from "@adobe/ccweb-add-on-sdk-types/sandbox/express-document-sdk";

interface CreateProps {
    width: string,
    height: string,
    color: string,
}
interface AddRows {
    rowsNumber:number,
    gutter:number,
    color:string
}
interface AddColumnsProps {
    columsNumber: number;
    gutter: number;
    color: string;
}
interface GridProps {
    rows: number;
    columns: number;
    gutter: number;
    columnColor: string;
    rowColor: string;
}
interface PageMetadata {
    hasPremiumContent: boolean;
    hasTemporalContent: boolean;
    id: string;
    isPrintReady?: boolean | undefined;
    pixelsPerInch?: number;
    size: {
        height: number;
        width: number;
    };
    title: string;
}

const App = ({ addOnUISdk }: { addOnUISdk: AddOnSDKAPI }) => {
    const [pageMetadata, setPageMetadata] = useState<PageMetadata | null>(null);

    const rowsColorPickerRef = useRef<HTMLInputElement>(null);
    const colsColorPickerRef = useRef<HTMLInputElement>(null);

    const [rowsInput, setRowsInput] = useState<number>(4);
    const [colsInput, setColsInput] = useState<number>(6);
    const [gutterInput, setGutterInput] = useState<number>(10);

    const [colsColorPicker, setColsColorPicker] = useState<string>("#ffcccc");
    const [colsColorSwatch, setColsColorSwatch] = useState<string>("#ffcccc");
    const [rowsColorPicker, setRowsColorPicker] = useState<string>("#ccccff");
    const [rowsColorSwatch, setRowsColorSwatch] = useState<string>("#ccccff");

    // SDK 초기화
    useEffect(() => {
        const fetchPageMetadata = async () => {
            try {
                if (!addOnUISdk || !addOnUISdk.app || !addOnUISdk.app.document) {
                    throw new Error("SDK가 올바르게 초기화되지 않았습니다.");
                }

                const options = {
                    range: addOnUISdk.constants.Range.currentPage
                };

                const metadata = await addOnUISdk.app.document.getPagesMetadata(options);

                if (metadata && metadata.length > 0) {
                    setPageMetadata(metadata[0]);
                } else {
                    console.error("메타데이터가 반환되지 않았습니다", metadata);
                }
            } catch (error) {
                console.error("페이지 메타데이터를 가져오는 데 실패했습니다:", error);
            }
        };

        fetchPageMetadata();
    }, [addOnUISdk]);


    // const createRect = (props: CreateProps) => {
    //     const {width, height, color} = props;
    //
    //     const rect = editor.createRectangle();
    //
    //     rect.width = parseInt(width);
    //     rect.height = parseInt(height);
    //     rect.fill = editor.makeColorFill(colorUtils.fromHex(color));
    //     return rect;
    // };

    const addRows = (props:AddRows) => {
        const {rowsNumber, gutter, color} = props;

        const rowHeight = (pageMetadata.size.height - (rowsNumber + 1) * gutter) / rowsNumber;
        var rowsRect = [];

        for (let i = 0; i < rowsNumber; i++) {
            // let currentNode = editor.context.insertionParent;
            const yPos = i * (rowHeight + gutter) + gutter;

            const rect = {
                x: 0,
                y: yPos,
                width: pageMetadata.size.width,
                height: rowHeight,
                fillColor: color
            };

            rowsRect.push(rect);
        }

        console.log(rowsRect);
        debugger

        // rowsRect.forEach((r,i)=>{page.artboards.first.children.append(r)});
        //
        // const rowsGroup = editor.createGroup();
        // page.artboards.first.children.append(rowsGroup);
        // rowsGroup.children.append(...rowsRect);
        // rowsGroup.blendMode = constants.BlendMode.multiply;
        // return rowsGroup;
    };

    // const addColumns =(props:AddColumnsProps) => {
    //     const {columsNumber, gutter, color} = props;
    //
    //     let currentNode = editor.context.insertionParent;
    //     let currentNode2 = null;
    //     let page = null;
    //
    //     while(currentNode){
    //         if(currentNode2 ? currentNode2.type === constants.SceneNodeType.page : currentNode.type === constants.SceneNodeType.page){
    //             page = currentNode;
    //             break;
    //         }
    //         currentNode2 = currentNode.parent;
    //     }
    //
    //     const colsWidth = (page.width - (columsNumber + 1) * gutter) / columsNumber;
    //     var colsRect = [];
    //     for(let i =0; i< columsNumber; i ++){
    //         let r = createRect({width:`${page.width}`, height:`${colsWidth}`, color});
    //         r.width = colsWidth;
    //         r.height = page.height;
    //         r.translation = { x : gutter + (gutter+colsWidth) * i, y : 0 };
    //         colsRect.push(r);
    //     }
    //
    //     colsRect.forEach((r,i)=>{page.artboards.first.children.append(r)});
    //
    //     const colsGroup = editor.createGroup();
    //     page.artboards.first.children.append(colsGroup);
    //     colsGroup.children.append(...colsRect);
    //     colsGroup.blendMode = constants.BlendMode.multiply;
    //     return colsGroup;
    // };

    const addGrid = async (props: GridProps) => {
        const {rows, columns, gutter, columnColor, rowColor} = props;
        console.log(props);

        console.log(pageMetadata);

        // debugger
        // const pagesMetadata = await addOnUISdk.app.document.getPagesMetadata();
        //
        // if (pagesMetadata && pagesMetadata.length > 0) {
        //     // 첫 번째 페이지를 선택합니다.
        //     console.log(pagesMetadata[0]);
        // } else {
        //     console.error('No pages found');
        // }

        // while(currentNode){
        //     currentNode.
        //     if(currentNode2 ? currentNode2.type === constants.SceneNodeType.page : currentNode.type === constants.SceneNodeType.page){
        //         page = currentNode;
        //         break;
        //     }
        //     currentNode2 = currentNode.parent;
        // }

        addRows({rowsNumber:rows, gutter: gutter, color:rowColor});
        // const colGroup = addColumns({columsNumber:columns, gutter:gutter, color:columnColor});
        //
        // const gridGroup = editor.createGroup();
        // page.artboards.first.children.append(gridGroup);
        // gridGroup.children.append(rowGroup, colGroup);
        // gridGroup.locked = false;
        //
        // gridRef = gridGroup;
    }

    return (
        <Theme theme="express" scale="medium" color="light">
            <div className="container">
                <h2>Design Grid creator</h2>
                <div className="row gap-20">
                    <div className="row">
                        <div className="column">
                            <FieldLabel for="rows" size="m">Rows</FieldLabel>
                            <NumberField
                                style={{width:"6.5rem"}}
                                id="rows"
                                min={1}
                                max={20}
                                value={rowsInput}
                                onInput={(event: React.FormEvent<HTMLElement>) => setRowsInput(parseInt((event.currentTarget as HTMLInputElement).value))}
                            />
                        </div>
                        <Swatch id="colsColorSwatch" className="color-well" color={colsColorSwatch} onClick={() => colsColorPickerRef.current.click()}></Swatch>
                        <input type="color" id="colsColorPicker" hidden value={colsColorPicker} ref={colsColorPickerRef} onChange={() => {
                            setColsColorSwatch(colsColorPickerRef.current.value);
                            setColsColorPicker(colsColorPickerRef.current.value);
                        }}/>
                    </div>
                    <div className="row">
                        <div className="column">
                            <FieldLabel for="columns" size="m">Cols</FieldLabel>
                            <NumberField
                                style={{width:"6.5rem"}}
                                id="columns"
                                min={1}
                                max={20}
                                value={colsInput}
                                onInput={(event: React.FormEvent<HTMLElement>) => setColsInput(parseInt((event.currentTarget as HTMLInputElement).value))}
                            ></NumberField>
                        </div>
                        <Swatch id="rowsColorSwatch" className="color-well" color={rowsColorSwatch} onClick={() => rowsColorPickerRef.current.click()}></Swatch>
                        <input type="color" id="rowsColorPicker" hidden value={rowsColorPicker} ref={rowsColorPickerRef} onChange={() => {
                            setRowsColorSwatch(rowsColorPickerRef.current.value);
                            setRowsColorPicker(rowsColorPickerRef.current.value);
                        }}/>
                    </div>
                </div>
                <div className="row">
                    <Slider
                        label="Gutter"
                        id="gutter"
                        variant="filled"
                        min={1}
                        max={50}
                        formatOptions={{ style: "unit", unit: "px" }}
                        step={1}
                        value={gutterInput}
                        onInput={(e) => setGutterInput(parseInt((e.target as HTMLInputElement).value))}
                        // editable
                    />
                </div>
                <ButtonGroup>
                    <Button id="deleteGrid" variant="secondary">Delete</Button>
                    <Button id="createGrid" onClick={() => addGrid({
                        columns: colsInput,
                        rows: rowsInput,
                        gutter: gutterInput,
                        columnColor: colsColorSwatch,
                        rowColor: rowsColorSwatch,
                    })}>Create</Button>
                </ButtonGroup>
            </div>
        </Theme>
    );
};

export default App;
