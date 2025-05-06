import React from 'react';
import upNextImg from "../../assets/next.jpg";
import { Link } from 'react-router-dom';
import SongCard from '../song';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import "./up-next.css";

const UpNext = () => {
    const upNextItems = [
        {
            id: 1,
            name: "Blah black 1",
            artist: "Drake",
            image: upNextImg,
            trending: true,
            publisher: "EDM music",
        },
        {
            id: 2,
            name: "Blah black 2",
            artist: "Drake",
            image: upNextImg,
            trending: true,
            publisher: "EDM music",
        },
        {
            id: 3,
            name: "Blah black 3",
            artist: "Drake",
            image: upNextImg,
            trending: true,
            publisher: "EDM music",
        },
        {
            id: 4,
            name: "Blah black 4",
            artist: "Drake",
            image: upNextImg,
            trending: true,
            publisher: "EDM music",
        },
        {
            id: 5,
            name: "Blah black 5",
            artist: "Drake",
            image: upNextImg,
            trending: true,
            publisher: "EDM music",
        },
        {
            id: 6,
            name: "Blah black 6",
            artist: "Drake",
            image: upNextImg,
            trending: true,
            publisher: "EDM music",
        },
        {
            id: 7,
            name: "Blah black 7",
            artist: "Drake",
            image: upNextImg,
            trending: true,
            publisher: "EDM music",
        },
        {
            id: 8,
            name: "Blah black 8",
            artist: "Drake",
            image: upNextImg,
            trending: true,
            publisher: "EDM music",
        },
        {
            id: 9,
            name: "Blah black 9",
            artist: "Drake",
            image: upNextImg,
            trending: true,
            publisher: "EDM music",
        },
    ];

    const queues = [
        { name: "Random✨", selected: false },
        { name: "Synchasm", selected: true },
        { name: "Onyx Wave", selected: true },
        { name: "Future Bass", selected: true },
        { name: "My Playlist 1", selected: false },
        { name: "RnB", selected: false },
        { name: "House", selected: false },
        { name: "Dance", selected: false },
        { name: "Future Bass", selected: false }
    ];
    const [queueItems, setQueueItems] = React.useState(queues);

    const searchQueue = (e) => {
        const searchValue = e.target.value.toLowerCase();
        const filteredItems = queues.filter(item => item.name.toLowerCase().includes(searchValue));
        setQueueItems(filteredItems);
    }

    const [sortedUpNextItems, setSortedUpNextItems] = React.useState(upNextItems);

    // Handle drag end logic
    const handleOnDragEnd = (result) => {
        if (!result.destination) return; // dropped outside the list

        const items = Array.from(sortedUpNextItems); // make a copy
        const [reorderedItem] = items.splice(result.source.index, 1); // remove the item
        items.splice(result.destination.index, 0, reorderedItem); // insert it at the destination

        setSortedUpNextItems(items); // update the state
    };


    const deleteItem = (id) => {
        const updatedItems = sortedUpNextItems.filter(item => item.id !== id);
        setSortedUpNextItems(updatedItems);
    }

    const [showMore, setShowMore] = React.useState(false);
    const handleShowMore = () => {
        setShowMore(!showMore);
    }
    return (
        <div className="px-5">
            <div className="items my-6 relative">

                <div className="upnext-holder relative">
                    {showMore ? <DragDropContext onDragEnd={handleOnDragEnd}>
                        <Droppable droppableId="upNextItems" direction="vertical">
                            {(provided) => (
                                <div
                                    className="up-next-item overflow-y-auto"
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                >
                                    {sortedUpNextItems.map((item, index) => (
                                        <Draggable
                                            key={item.id}
                                            draggableId={item.id.toString()}
                                            index={index}
                                        >
                                            {(provided, snapshot) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    className={`mb-2 transition-transform ${snapshot.isDragging ? "scale-105" : ""}`}
                                                >
                                                    <SongCard item={item} deleteItem={deleteItem} />
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {/* Placeholder element */}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext> :
                        // show first 4 items
                        <div className="up-next-item overflow-y-auto">
                            {sortedUpNextItems.slice(0, 4).map((item, index) => (
                                <SongCard key={index} item={item} deleteItem={deleteItem} />
                            ))}
                        </div>
                    }
                </div>

                {/* show more */}
                <div className={`overlay bottom-0 left-0 ${showMore ? "relative" : "absolute h-[150px]"} 
                    right-0 bg-gradient-to-b from-[#00000055] to-black z-[100]`}></div>
                <div className={`left-0 right-0 flex justify-center items-center z-[1000] ${showMore ? "relative mt-3" : "absolute bottom-[15px]"} `}>
                    <button onClick={handleShowMore} className='text-[#ffffff9c] text-lg cursor-pointer hover:text-white hover:scale-110 transition-all duration-300'>
                        {!showMore ? "Show More" : "Show Less"}
                    </button>
                </div>
            </div>

            {/* Search bar */}
            <div className="mt-8">
                <form action="" className='search-wrapper' style={{ width: "100%" }}>
                    <input onChange={searchQueue} type="text" className='search-field' placeholder='Add to Queue' name="" id="" />
                </form>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap justify-start items-center gap-3 mt-6">
                {
                    queueItems.map((item, index) => (
                        <Link
                            key={index}
                            onClick={() => {
                                const updatedQueueItems = queueItems.map((queueItem, i) =>
                                    i === index ? { ...queueItem, selected: !queueItem.selected } : queueItem
                                );
                                setQueueItems(updatedQueueItems);
                            }}
                            className={`px-3 link-button py-1 hover:scale-110 rounded-[40px] flex justify-center items-center gap-2 ${item.selected ? "selected" : "not-selected"} text-[13px]`}
                        >
                            {item.name}
                        </Link>
                    ))
                }
            </div>
        </div>
    );
};

export default UpNext;
