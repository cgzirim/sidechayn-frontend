import useMusicStore from "../../stores/useMusicStore";
import i1 from "../../assets/i1.webp";

const SharesButton = () => {
  const { shares, incrementShares } = useMusicStore();

  return (
    <button
      onClick={incrementShares}
      className="cursor-pointer bg-[#0e0e0e] hover:bg-[#353535] px-3 py-1 rounded-[40px] flex items-center gap-2 border border-[#353535]"
    >
      <img src={i1} alt="" className="w-[19px] h-[19px]" />
      <span className="text-[#ffffff9c] text-sm">{shares}</span>
    </button>
  );
};

export default SharesButton;
