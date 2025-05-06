import React from 'react'
import "./mood-modal.css"

const MoodModal = ({ handleClose }) => {
    const moods = [
        {
            id: 1,
            name: "Anticipation",
            selected: false,
        },
        {
            id: 2,
            name: "Excited",
            selected: false,
        },
        {
            id: 3,
            name: "Happy",
            selected: false,
        },
        {
            id: 4,
            name: "Sad",
            selected: false,
        },
        {
            id: 5,
            name: "Angry",
            selected: false,
        },
        {
            id: 6,
            name: "Calm",
            selected: false,
        },
        {
            id: 7,
            name: "Confused",
            selected: false,
        },
        {
            id: 8,
            name: "Fearful",
            selected: false,
        },
    ]

    const [activeMoods, setActiveMoods] = React.useState(moods)

    const handleMoodClick = (id) => {
        const updatedMoods = activeMoods.map((mood) => {
            if (mood.id === id) {
                return { ...mood, selected: !mood.selected }
            }
            return mood
        })
        setActiveMoods(updatedMoods)
    }

    const addNewMood = (e) => {
        // add new mood, selected
        e.preventDefault()
        const newMood = e.target[0].value

        if (newMood) {
            const newMoodObj = {
                id: activeMoods.length + 1,
                name: newMood,
                selected: true,
            }
            setActiveMoods([...activeMoods, newMoodObj])
            e.target[0].value = ""
        }
    }

    return (
        <>
            <div className="modal-bg bg-black opacity-75 fixed top-0 left-0 h-screen w-full z-[2000000]" onClick={handleClose}></div>

            <div className="mood-modal card w-[440px] max-w-full mx-auto rounded-[20px] p-10 max-w-[90%] fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[999999999999] rounded-xl">
                <div className="text-right">
                    <button className='btn rounded-full cursor-pointer' onClick={handleClose}>
                        <div className="cross_button-wrap"><img className='w-6' loading="lazy" src="https://cdn.prod.website-files.com/66b1e34f1cccd77056bac6df/679af985a959812d7b3bd5b7_cross-circle-svgrepo-com.svg" alt="" /></div>
                    </button>
                </div>

                <div className="pb-5 pt-2 px-6">
                    <div className="text-left">
                        <p className="text-[#949494] fw-semibold text-xl">
                            Mood
                        </p>

                        {/* moods */}
                        <div className="mood-list flex gap-[10px] flex-wrap gap-2 mt-4">
                            {
                                activeMoods.map((mood) => (
                                    <div key={mood.id} onClick={() => handleMoodClick(mood.id)} className={`mood-item bg-black px-3 py-1 rounded-[9px] text-sm ${mood.selected ? 'border border-white' : 'border border-transparent'} cursor-pointer`}>
                                        {mood.name}
                                    </div>
                                ))
                            }
                        </div>

                        {/* or add a new mood */}
                        <div className="text-center py-5">
                            <span className="text-sm text-white">or</span>
                        </div>


                        <form action="" onSubmit={addNewMood}>
                            {/* suggest a mood */}
                            <div className="suggest-mood flex gap-2">
                                <input type="text" placeholder='Suggest a mood' className='mood-input text-sm px-3 py-2 rounded-[9px] w-full' />
                                {/* <button className='suggest-button bg-blue-500 text-white px-4 py-2 rounded-[9px]'>Suggest</button> */}
                            </div>
                            <button type='submit' className='upload_button cursor-pointer is-blue w-button px-4 mx-auto text-sm py-2 rounded-md mt-6'>
                                Submit
                            </button>
                        </form>



                    </div>
                </div>
            </div>
        </>
    )
}

export default MoodModal