import DraggableBox from "@/components/DraggableBox";
import FileDropzone from "@/components/FileDropzone";
import TextHighlight from "@/components/TextHighlight";

const Home = () => {
    return (
        <div>
          <h1>파일 업로드</h1>
          <FileDropzone />

          <h1>드래그하여 박스 생성</h1>
          <DraggableBox />

          <h1>드래그하여 텍스트 하이라이팅</h1>
          <TextHighlight />
        </div>
      );
};

export default Home;
