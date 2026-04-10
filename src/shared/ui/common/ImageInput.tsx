import imageCompression from "browser-image-compression";

interface Props {
  onFileChange: (file: File | File[] | null) => void;
  className?: string;
  id: string;
  compress?: boolean; //이미지 파일 압축 여부
  multiple?: boolean; //파일 다중선택 가능 여부
}

const ImageInput = ({
  onFileChange,
  className,
  id,
  compress = false,
  multiple = false,
}: Props) => {
  const compressImage = async (file: File) => {
    const options = {
      maxSizeMB: 0.7,
      maxWidthOrHeight: 1024,
    };

    return await imageCompression(file, options);
  };
  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (!fileList || fileList.length === 0) {
      onFileChange(null);
      return;
    }
    let files = Array.from(fileList);

    if (compress) {
      files = await Promise.all(files.map((f) => compressImage(f)));
    }
    if (multiple) {
      onFileChange(files);
    } else onFileChange(files[0]);
  };
  return (
    <>
      <input
        type="file"
        id={id}
        className="hidden"
        accept="image/*"
        onChange={handleFile}
        multiple={multiple}
      />

      {/* input을 트리거하는 라벨 (버튼처럼 디자인) */}

      <label
        htmlFor={id}
        tabIndex={0}
        onKeyDown={(e: React.KeyboardEvent) => {
          if (e.key === "Enter") {
            e.preventDefault();
            document.getElementById("breedFinderImage")?.click();
          }
        }}
        className={`px-8 py-3 bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold rounded-full transition-all cursor-pointer ${className}`}
      >
        파일 선택
      </label>
    </>
  );
};

export default ImageInput;
