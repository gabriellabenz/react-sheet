import { useState } from "react";
import { dataTable } from "../../mock/dataTable";
export default function Table() {
  const [cols, setCols] = useState(Object.keys(dataTable[0]));
  const [rows, setRows] = useState(dataTable);
  const [dragOver, setDragOver] = useState("");
  const [hide, setHide] = useState(false);
  const [hiddenCol, setHiddenCol] = useState("ss");

  const handleDragStart = (e) => {
    const { id } = e.target;
    const idx = cols.indexOf(id);
    e.dataTransfer.setData("colIdx", idx);
  };

  const handleDragOver = (e) => e.preventDefault();
  const handleDragEnter = (e) => {
    const { id } = e.target;
    setDragOver(id);
  };

  const hideColumn = (e) => {
    const head = e.target.parentNode.firstElementChild.innerHTML;
    setHiddenCol(JSON.stringify(head));
    setHide((hide) => !hide);
    if (e.target.classList.contains('opacity')) {
      e.target.classList.remove('opacity')
      e.target.parentNode.firstElementChild.classList.remove('remove')
    } else {
      e.target.classList.add('opacity')
      e.target.parentNode.firstElementChild.classList.add('remove')
    }
  };

  const handleOnDrop = (e) => {
    const { id } = e.target;
    const droppedColIdx = cols.indexOf(id);
    const draggedColIdx = e.dataTransfer.getData("colIdx");
    const tempCols = [...cols];

    tempCols[draggedColIdx] = cols[droppedColIdx];
    tempCols[droppedColIdx] = cols[draggedColIdx];
    setCols(tempCols);
    setDragOver("");
  };
  return (
    <>
      <div className="container">
        <div className="spreadsheet">
          <h1>REACT SHEET</h1>
        </div>
        <table className="sheet_table">
          <thead>
            <tr>
              <th className="sheetheader" tabIndex="O"></th>
              {cols.map((col, i) => (
                <th
                  id={col}
                  draggable
                  onDragStart={handleDragStart}
                  onDragOver={handleDragOver}
                  onDrop={handleOnDrop}
                  onDragEnter={handleDragEnter}
                  dragOver={col === dragOver}
                  key={i}
                  className="sheetheader"
                >
                  <span>{col.replace(/_/g, " ")}</span>
                  <button onClick={(e) => hideColumn(e) }>hidden</button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} row="0">
                <td style={{ backgroundColor: "#c4c3d0" }}>{i + 1}</td>
                {Object.entries(row).map(([key, val], idx) => (
                  <td
                    contentEditable
                    className={
                      hiddenCol.replace(/ /g, "_").replaceAll('"', "") ===
                        cols[idx] && hide
                        ? "hide"
                        : ""
                    }
                    key={val + key}
                    dragOver={cols[idx] === dragOver}
                  >
                    {row[cols[idx]]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <footer>
        <h2>Footer</h2>
      </footer>
    </>
  );
}
