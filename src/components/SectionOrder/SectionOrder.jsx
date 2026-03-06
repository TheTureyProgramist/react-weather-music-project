import styled from "styled-components";

const SectionOrderContainer = styled.div`
  margin: 20px 0 30px 0;
  background: #ff005d;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 2px 8px #0001;
  @media (min-width: 1920px) {
    padding: 24px;
    h4 {
      font-size: 22px !important;
    }
    span,
    button {
      font-size: 18px !important;
    }
  }
`;

export default function SectionOrder({ siteSections, moveSiteSection, resetSiteSections }) {
  return (
    <SectionOrderContainer>
      <h4 style={{ fontWeight: 700, fontSize: 16, margin: "15px" }}>
        Порядок секцій сайту:
      </h4>
      {siteSections.map((section, idx) => (
        <div
          key={section.key}
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: 6,
          }}
        >
          <span style={{ minWidth: 120, fontWeight: 500 }}>{section.label}</span>
          <button
            style={{
              fontSize: "16px",
              padding: "2px 8px",
              borderRadius: "6px",
              border: "1px solid #aaa",
              background: "#eee",
              marginLeft: 8,
              cursor: idx === 0 ? "not-allowed" : "pointer",
            }}
            disabled={idx === 0}
            onClick={() => moveSiteSection(idx, -1)}
            title="Вище"
          >
            ↑
          </button>
          <button
            style={{
              fontSize: "16px",
              padding: "2px 8px",
              borderRadius: "6px",
              border: "1px solid #aaa",
              background: "#eee",
              marginLeft: 4,
              cursor: idx === siteSections.length - 1 ? "not-allowed" : "pointer",
            }}
            disabled={idx === siteSections.length - 1}
            onClick={() => moveSiteSection(idx, 1)}
            title="Нижче"
          >
            ↓
          </button>
        </div>
      ))}
      <button
        style={{
          marginTop: 10,
          padding: "6px 18px",
          borderRadius: "8px",
          border: "1px solid #aaa",
          background: "#ffe0b2",
          fontWeight: 600,
          cursor: "pointer",
        }}
        onClick={resetSiteSections}
      >
        Скинути порядок
      </button>
    </SectionOrderContainer>
  );
}
