'use client'

import React, { useState, useRef } from 'react';
import '../styles/TextHighlight.css';

// 하이라이트된 텍스트의 정보를 담는 인터페이스
interface Highlight {
  id: string;          // 고유 식별자
  text: string;        // 하이라이트된 텍스트
  startOffset: number; // 텍스트 시작 위치
  endOffset: number;   // 텍스트 끝 위치
}

const TextHighlight = () => {

    // 하이라이트된 항목들을 저장
    const [highlights, setHighlights] = useState<Highlight[]>([]);

    // 텍스트 박스의 참조를 저장
    const textBoxRef = useRef<HTMLDivElement>(null);

    // 선택된 텍스트를 저장
    const [selectedText, setSelectedText] = useState<string>('');

     // 하이라이트할 수 있는 전체 텍스트 내용
    const [text] = useState(`리액트(React)는 사용자 인터페이스를 구축하기 위한 선언적이고 효율적이며 유연한 JavaScript 라이브러리입니다. 
    "컴포넌트"라고 불리는 작고 고립된 코드의 파편을 이용하여 복잡한 UI를 구성하도록 돕습니다.
    리액트는 페이스북과 개별 오픈소스 개발자 및 기업들 공동체에 의해 유지보수되고 있습니다.`);

     // 마우스로 텍스트 선택을 끝냈을 때 실행
    const handleMouseUp = () => {

        const selection = window.getSelection();
        if (!selection || selection.isCollapsed) return; // 선택된 텍스트가 없으면 종료

        const selectedText = selection.toString().trim();
        if (!selectedText || !textBoxRef.current) return; // 선택된 텍스트가 비어있거나 ref가 없으면 종료

        // 선택된 텍스트의 전체 텍스트 내 위치 찾기
        const fullText = text;
        const foundIndex = fullText.indexOf(selectedText);
        if (foundIndex === -1) return; // 텍스트를 찾지 못하면 종료

        const startOffset = foundIndex;
        const endOffset = startOffset + selectedText.length;

        // 기존 하이라이트와의 겹침 여부 확인
        const isOverlapping = highlights.some(highlight => {
            const highlightedText = text.substring(highlight.startOffset, highlight.endOffset);
            const selectedRange = text.substring(startOffset, endOffset);

             // 겹치는 조건 확인
            return highlightedText.includes(selectedRange) || 
                   selectedRange.includes(highlightedText) ||
                   (startOffset < highlight.endOffset && endOffset > highlight.startOffset);
        });

        if (!isOverlapping) {
            // 새로운 하이라이트 추가
            const newHighlight: Highlight = {
                id: Math.random().toString(36).substr(2, 9),  // 랜덤 ID 생성
                text: selectedText,
                startOffset,
                endOffset
            };
            setHighlights(prev => [...prev, newHighlight]);
            setSelectedText(`선택된 텍스트: "${selectedText}"`);
        } else {
            setSelectedText('이미 하이라이트된 영역과 겹칠 수 없습니다.');
        }

        selection.removeAllRanges(); // 선택 상태 초기화
    };

    // 하이라이트 제거
    const removeHighlight = (id: string) => {
        setHighlights(prev => prev.filter(h => h.id !== id));
    };

    // 하이라이트가 적용된 텍스트 렌더링
    const renderHighlightedText = () => {
        let result = [];
        let lastIndex = 0;

        // 시작 위치 기준으로 하이라이트 정렬
        const sortedHighlights = [...highlights].sort((a, b) => a.startOffset - b.startOffset);

        // 각 하이라이트에 대해 처리
        sortedHighlights.forEach((highlight, index) => {
             // 일반 텍스트 추가
            if (highlight.startOffset > lastIndex) {
                result.push(
                    <span key={`text-${index}`}>
                        {text.substring(lastIndex, highlight.startOffset)}
                    </span>
                );
            }
            
            // 하이라이트된 텍스트 추가
            result.push(
                <span key={highlight.id} className="highlight">
                    {text.substring(highlight.startOffset, highlight.endOffset)}
                    <button
                        className="remove-btn"
                        onClick={(e) => {
                            e.stopPropagation();
                            removeHighlight(highlight.id);
                        }}
                    >
                        ×
                    </button>
                </span>
            );
            
            lastIndex = highlight.endOffset;
        });

        // 마지막 하이라이트 이후의 텍스트 추가
        if (lastIndex < text.length) {
            result.push(
                <span key="final-text">
                    {text.substring(lastIndex)}
                </span>
            );
        }

        return result;
    };

    return (
        <div className="text-highlight-container">
            <div
                ref={textBoxRef}
                className="box"
                onMouseUp={handleMouseUp}
            >
                {renderHighlightedText()}
            </div>
            <div className="output">
                {selectedText}
            </div>
            <button
                className="show-highlights-btn"
                onClick={() => alert(JSON.stringify(highlights.map(h => h.text)))}
            >
                하이라이트 목록 보기
            </button>
        </div>
    );
};

export default TextHighlight;