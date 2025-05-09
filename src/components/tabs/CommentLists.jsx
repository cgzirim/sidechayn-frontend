import React, { useEffect, useState } from "react";
import dotsIcon from "../../assets/dots.png";
import userAvatar from "../../assets/user-avatar.jpg";
import useComments from "../../api/hooks/comments/useComments";
import LoadindState from "../States/LoadingState";
import { formatDistanceToNow } from "date-fns";

// comments
const allComments = [
  {
    id: 1,
    userAvatar: userAvatar,
    userName: "User3442",
    comment:
      "I think self-publishing is probably a lot easier now because of social media and other ways to marke",
    date: "5h ago",
    hearts: 25,
    thumbs: 5,
    replies: [
      {
        id: 1,
        userAvatar: userAvatar,
        userName: "User3442",
        comment:
          "I think self-publishing is probably a lot easier now because of social media and other ways to marke",
        date: "5h ago",
        hearts: 25,
        thumbs: 5,
      },
    ],
  },
  {
    id: 1,
    userAvatar: userAvatar,
    userName: "User3442",
    comment:
      "I think self-publishing is probably a lot easier now because of social media and other ways to marke",
    date: "5h ago",
    hearts: 25,
    thumbs: 5,
    replies: [
      {
        id: 1,
        userAvatar: userAvatar,
        userName: "User3442",
        comment:
          "I think self-publishing is probably a lot easier now because of social media and other ways to marke",
        date: "5h ago",
        hearts: 25,
        thumbs: 5,
      },
    ],
  },
  {
    id: 1,
    userAvatar: userAvatar,
    userName: "User3442",
    comment:
      "I think self-publishing is probably a lot easier now because of social media and other ways to marke",
    date: "5h ago",
    hearts: 25,
    thumbs: 5,
    replies: [
      {
        id: 1,
        userAvatar: userAvatar,
        userName: "User3442",
        comment:
          "I think self-publishing is probably a lot easier now because of social media and other ways to marke",
        date: "5h ago",
        hearts: 25,
        thumbs: 5,
      },
    ],
  },
];
const CommentLists = () => {
  const [comments, setComments] = useState([]);

  const { data, isLoading } = useComments();

  console.log("Comments: => ", data);
  useEffect(() => {
    setComments(allComments);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) return <LoadindState />;

  if (data && data.results)
    return (
      <div className="comments mt-6">
        {data.results.map((comment, index) => (
          <div
            key={index}
            className="flex justify-between items-start gap-4 my-8"
          >
            <div className="flex justify-start items-start gap-3">
              <img
                src={comment.user.profile_picture}
                className="w-[50px] h-[50px] rounded-full"
                alt=""
              />
              <div className="content">
                <div className="flex justify-start items-center gap-3">
                  <h3 className="text-[22px] text-white">
                    {comment.user.username}
                  </h3>
                  <div className="dot w-1.5 h-1.5 bg-[#686868] rounded-full"></div>
                  <h4 className="text-lg text-[#686868]">
                    {formatDistanceToNow(new Date(comment.created_at), {
                      addSuffix: true,
                    })}
                  </h4>
                </div>

                <p className="text-[#b3b3b3] mb-5">{comment.text}</p>

                <div className="flex justify-start items-center gap-3">
                  <p
                    onClick={() => {
                      // setComments((prevComments) =>
                      //   prevComments.map((comment, idx) =>
                      //     idx === index
                      //       ? { ...comment, hearts: comment.hearts + 1 }
                      //       : comment
                      //   )
                      // );
                    }}
                    className="cursor-pointer text-sm bg-[#131313] px-3 py-2 rounded-[20px]"
                  >
                    ❤️ {0}
                  </p>
                  <p
                    onClick={() => {
                      // setComments((prevComments) =>
                      //   prevComments.map((comment, idx) =>
                      //     idx === index
                      //       ? { ...comment, thumbs: comment.thumbs + 1 }
                      //       : comment
                      //   )
                      // );
                    }}
                    className="cursor-pointer text-sm bg-[#131313] px-3 py-2 rounded-[20px]"
                  >
                    👍 {comment.total_likes}
                  </p>
                  <button className="text-sm bg-[#131313] px-3 py-2 rounded-[20px]">
                    Reply
                  </button>
                </div>

                {/* {item?.replies?.length > 0 && (
                <div className="replies mt-6 xl:ml-8 bg-[#131313] xl:p-3 p-2 rounded-[20px]">
                  {item?.replies?.map((reply, replyIndex) => (
                    <div
                      key={replyIndex}
                      className="flex m-4 justify-start items-start gap-3"
                    >
                      <img
                        src={reply.userAvatar}
                        className="w-[50px] h-[50px] rounded-full"
                        alt=""
                      />
                      <div className="content">
                        <div className="flex flex-wrap justify-start items-center gap-3">
                          <h3 className="xl:text-[22px] text-white">
                            {reply.userName}
                          </h3>
                          <div className="dot xl:block hidden w-1.5 h-1.5 bg-[#686868] rounded-full"></div>
                          <h4 className="xl:text-lg xl:block hidden text-[#686868]">
                            {reply.date}
                          </h4>
                        </div>

                        <p className="text-[#b3b3b3] mb-5 xl:text-[16px] text-sm">
                          {reply.comment}
                        </p>

                        <div className="flex justify-start items-center xl:gap-3 gap-1">
                          <p
                            onClick={() => {
                              setComments((prevComments) =>
                                prevComments.map((comment, idx) =>
                                  idx === index
                                    ? {
                                        ...comment,
                                        replies: comment.replies.map(
                                          (r, rIdx) =>
                                            rIdx === replyIndex
                                              ? {
                                                  ...r,
                                                  hearts: r.hearts + 1,
                                                }
                                              : r
                                        ),
                                      }
                                    : comment
                                )
                              );
                            }}
                            className="cursor-pointer text-xs lg:text-sm bg-[#131313] px-3 py-2 rounded-[20px]"
                          >
                            ❤️ {reply.hearts}
                          </p>
                          <p
                            onClick={() => {
                              setComments((prevComments) =>
                                prevComments.map((comment, idx) =>
                                  idx === index
                                    ? {
                                        ...comment,
                                        replies: comment.replies.map(
                                          (r, rIdx) =>
                                            rIdx === replyIndex
                                              ? {
                                                  ...r,
                                                  thumbs: r.thumbs + 1,
                                                }
                                              : r
                                        ),
                                      }
                                    : comment
                                )
                              );
                            }}
                            className="cursor-pointer text-xs lg:text-sm bg-[#131313] px-3 py-2 rounded-[20px]"
                          >
                            👍 {reply.thumbs}
                          </p>
                          <button className="text-xs lg:text-sm bg-[#131313] px-3 py-2 rounded-[20px]">
                            Reply
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )} */}
              </div>
            </div>
            <button className="">
              <img
                src={dotsIcon}
                alt=""
                className="w-[28px] hover:scale-[1.01]"
              />
            </button>
          </div>
        ))}
      </div>
    );
};

export default CommentLists;

// import React, { useEffect, useState } from "react";
// import dotsIcon from "../../assets/dots.png";
// import userAvatar from "../../assets/user-avatar.jpg";
// import useComments from "../../api/hooks/comments/useComments";

// // comments
// const allComments = [
//   {
//     id: 1,
//     userAvatar: userAvatar,
//     userName: "User3442",
//     comment:
//       "I think self-publishing is probably a lot easier now because of social media and other ways to marke",
//     date: "5h ago",
//     hearts: 25,
//     thumbs: 5,
//     replies: [
//       {
//         id: 1,
//         userAvatar: userAvatar,
//         userName: "User3442",
//         comment:
//           "I think self-publishing is probably a lot easier now because of social media and other ways to marke",
//         date: "5h ago",
//         hearts: 25,
//         thumbs: 5,
//       },
//     ],
//   },
//   {
//     id: 1,
//     userAvatar: userAvatar,
//     userName: "User3442",
//     comment:
//       "I think self-publishing is probably a lot easier now because of social media and other ways to marke",
//     date: "5h ago",
//     hearts: 25,
//     thumbs: 5,
//     replies: [
//       {
//         id: 1,
//         userAvatar: userAvatar,
//         userName: "User3442",
//         comment:
//           "I think self-publishing is probably a lot easier now because of social media and other ways to marke",
//         date: "5h ago",
//         hearts: 25,
//         thumbs: 5,
//       },
//     ],
//   },
//   {
//     id: 1,
//     userAvatar: userAvatar,
//     userName: "User3442",
//     comment:
//       "I think self-publishing is probably a lot easier now because of social media and other ways to marke",
//     date: "5h ago",
//     hearts: 25,
//     thumbs: 5,
//     replies: [
//       {
//         id: 1,
//         userAvatar: userAvatar,
//         userName: "User3442",
//         comment:
//           "I think self-publishing is probably a lot easier now because of social media and other ways to marke",
//         date: "5h ago",
//         hearts: 25,
//         thumbs: 5,
//       },
//     ],
//   },
// ];
// const CommentLists = () => {
//   const [comments, setComments] = useState([]);

//   const { data, isLoading } = useComments();

//   console.log("Comments: => ", data);
//   useEffect(() => {
//     setComments(allComments);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   return (
//     <div className="comments mt-6">
//       {comments.map((item, index) => (
//         <div
//           key={index}
//           className="flex justify-between items-start gap-4 my-8"
//         >
//           <div className="flex justify-start items-start gap-3">
//             <img
//               src={item.userAvatar}
//               className="w-[50px] h-[50px] rounded-full"
//               alt=""
//             />
//             <div className="content">
//               <div className="flex justify-start items-center gap-3">
//                 <h3 className="text-[22px] text-white">{item.userName}</h3>
//                 <div className="dot w-1.5 h-1.5 bg-[#686868] rounded-full"></div>
//                 <h4 className="text-lg text-[#686868]">{item.date}</h4>
//               </div>

//               <p className="text-[#b3b3b3] mb-5">{item.comment}</p>

//               <div className="flex justify-start items-center gap-3">
//                 <p
//                   onClick={() => {
//                     setComments((prevComments) =>
//                       prevComments.map((comment, idx) =>
//                         idx === index
//                           ? { ...comment, hearts: comment.hearts + 1 }
//                           : comment
//                       )
//                     );
//                   }}
//                   className="cursor-pointer text-sm bg-[#131313] px-3 py-2 rounded-[20px]"
//                 >
//                   ❤️ {item.hearts}
//                 </p>
//                 <p
//                   onClick={() => {
//                     setComments((prevComments) =>
//                       prevComments.map((comment, idx) =>
//                         idx === index
//                           ? { ...comment, thumbs: comment.thumbs + 1 }
//                           : comment
//                       )
//                     );
//                   }}
//                   className="cursor-pointer text-sm bg-[#131313] px-3 py-2 rounded-[20px]"
//                 >
//                   👍 {item.thumbs}
//                 </p>
//                 <button className="text-sm bg-[#131313] px-3 py-2 rounded-[20px]">
//                   Reply
//                 </button>
//               </div>

//               {item?.replies?.length > 0 && (
//                 <div className="replies mt-6 xl:ml-8 bg-[#131313] xl:p-3 p-2 rounded-[20px]">
//                   {item?.replies?.map((reply, replyIndex) => (
//                     <div
//                       key={replyIndex}
//                       className="flex m-4 justify-start items-start gap-3"
//                     >
//                       <img
//                         src={reply.userAvatar}
//                         className="w-[50px] h-[50px] rounded-full"
//                         alt=""
//                       />
//                       <div className="content">
//                         <div className="flex flex-wrap justify-start items-center gap-3">
//                           <h3 className="xl:text-[22px] text-white">
//                             {reply.userName}
//                           </h3>
//                           <div className="dot xl:block hidden w-1.5 h-1.5 bg-[#686868] rounded-full"></div>
//                           <h4 className="xl:text-lg xl:block hidden text-[#686868]">
//                             {reply.date}
//                           </h4>
//                         </div>

//                         <p className="text-[#b3b3b3] mb-5 xl:text-[16px] text-sm">
//                           {reply.comment}
//                         </p>

//                         <div className="flex justify-start items-center xl:gap-3 gap-1">
//                           <p
//                             onClick={() => {
//                               setComments((prevComments) =>
//                                 prevComments.map((comment, idx) =>
//                                   idx === index
//                                     ? {
//                                         ...comment,
//                                         replies: comment.replies.map(
//                                           (r, rIdx) =>
//                                             rIdx === replyIndex
//                                               ? {
//                                                   ...r,
//                                                   hearts: r.hearts + 1,
//                                                 }
//                                               : r
//                                         ),
//                                       }
//                                     : comment
//                                 )
//                               );
//                             }}
//                             className="cursor-pointer text-xs lg:text-sm bg-[#131313] px-3 py-2 rounded-[20px]"
//                           >
//                             ❤️ {reply.hearts}
//                           </p>
//                           <p
//                             onClick={() => {
//                               setComments((prevComments) =>
//                                 prevComments.map((comment, idx) =>
//                                   idx === index
//                                     ? {
//                                         ...comment,
//                                         replies: comment.replies.map(
//                                           (r, rIdx) =>
//                                             rIdx === replyIndex
//                                               ? {
//                                                   ...r,
//                                                   thumbs: r.thumbs + 1,
//                                                 }
//                                               : r
//                                         ),
//                                       }
//                                     : comment
//                                 )
//                               );
//                             }}
//                             className="cursor-pointer text-xs lg:text-sm bg-[#131313] px-3 py-2 rounded-[20px]"
//                           >
//                             👍 {reply.thumbs}
//                           </p>
//                           <button className="text-xs lg:text-sm bg-[#131313] px-3 py-2 rounded-[20px]">
//                             Reply
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>
//           <button className="">
//             <img
//               src={dotsIcon}
//               alt=""
//               className="w-[28px] hover:scale-[1.01]"
//             />
//           </button>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default CommentLists;
