import React from 'react';

const Results = ({ answers }) => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Sonuçlar</h2>
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b border-gray-200 bg-gray-100">Soru</th>
            <th className="py-2 px-4 border-b border-gray-200 bg-gray-100">Cevap</th>
          </tr>
        </thead>
        <tbody>
          {answers.map((answer, index) => (
            <tr key={index} className="odd:bg-gray-50">
              <td className="py-2 px-4 border-b border-gray-200">{index + 1}</td>
              <td className="py-2 px-4 border-b border-gray-200">{answer.answerIndex !== -1 ? String.fromCharCode(97 + answer.answerIndex).toUpperCase() : 'Boş'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Results;
