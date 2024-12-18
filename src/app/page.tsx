import DraggableBox from "@/components/DraggableBox";
import FileDropzone from "@/components/FileDropzone";

const Home = () => {
    return (
        <div>
          <h1>파일 업로드</h1>
          <FileDropzone />

          <h1>드래그하여 박스 생성</h1>
          <DraggableBox />
        </div>
      );
};

export default Home;
