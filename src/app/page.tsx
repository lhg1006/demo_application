import DraggableBox from "@/components/DraggableBox";
import FileDropzone from "@/components/FileDropzone";
import TextHighlight from "@/components/TextHighlight";

const Home = () => {
    return (
        <div className="max-w-[800px] mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4 text-center">파일 업로드</h1>
          <FileDropzone />

          <h1 className="text-2xl font-bold mb-4 mt-8 text-center">드래그하여 박스 생성</h1>
          <DraggableBox />

          <h1 className="text-2xl font-bold mb-4 mt-8 text-center">드래그하여 텍스트 하이라이팅</h1>
          <TextHighlight />
        </div>
    );
};

export default Home;
