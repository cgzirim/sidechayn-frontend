import React, { use } from "react";
import { useForm } from "react-hook-form";
import { IoSend } from "react-icons/io5";
import apiClient from "../../api/apiClient";
import useAuthUser from "../../api/hooks/useAuthUser";
import useMusicStore from "../../stores/useMusicStore";

const CreateCommentForm = () => {
  const { handleSubmit, register } = useForm();
  const { data: userInfo, isLoading: isLoadingUser } = useAuthUser();
  const { currentPlayingSong } = useMusicStore();

  const onSubmit = async (formValues) => {
    console.log("formValues", formValues, userInfo);

    const createdComment = await apiClient.post("comments/", {
      referenced_user_id: userInfo.id,
      text: formValues.comment,
      song: currentPlayingSong.id,
      //   parent: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    });
  };

  //   {
  //     "id": "ac0911e2-3fc5-40b3-878d-035de7c0031e",
  //     "user": {
  //         "id": "ac0911e2-3fc5-40b3-878d-035de7c0031e",
  //         "username": "default",
  //         "profile_picture": "https://sidechayn.sfo3.digitaloceanspaces.com/sidechayn/default/profile_pic.png"
  //     },
  //     "is_edited": false,
  //     "total_likes": 0,
  //     "total_dislikes": 0,
  //     "referenced_user": "default",
  //     "text": "I love this Song Kai",
  //     "created_at": "2025-05-08T01:06:07.545812Z",
  //     "updated_at": "2025-05-08T01:06:07.545864Z",
  //     "song": "f2e94819-94f0-4266-93e4-ce49356424ed",
  //     "parent": null
  // }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="search-wrapper w-full mt-[15px]"
      style={{ width: "100%" }}
    >
      <div className=" relative w-full">
        <input
          {...register("comment", { required: true })}
          style={{ paddingRight: "40px" }}
          type="text"
          className="search-field text-sm pr-8  "
          placeholder="Write a comment"
          id=""
        />
        <button style={{ cursor: "pointer" }} className=" cursur-pointer">
          <IoSend className=" absolute right-4 top-1/2 -translate-y-1/2" />
        </button>
      </div>
    </form>
  );
};

export default CreateCommentForm;
