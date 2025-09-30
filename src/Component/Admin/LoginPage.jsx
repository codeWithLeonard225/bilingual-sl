import React, { useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../../firebase";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [userID, setUserID] = useState("");
  const [userName, setUserName] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // Fetch fee records for pupil
  const fetchFeeData = async (studentId) => {
    try {
      const q = query(
        collection(db, "Receipts"),
        where("studentID", "==", studentId)
      );
      const snapshot = await getDocs(q);
      return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    } catch (err) {
      console.error("Error fetching fee data:", err);
      return [];
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // 1️⃣ Pupils
      const pupilQuery = query(
        collection(db, "Voters"),
        where("studentID", "==", userID),
        where("studentName", "==", userName)
      );
      const pupilSnap = await getDocs(pupilQuery);

      if (!pupilSnap.empty) {
        const pupil = pupilSnap.docs[0].data();
        const fees = await fetchFeeData(pupil.studentID);

        // ✅ Pass state to route
        navigate("/pupil", { state: { pupil, fees } });
        return;
      }

      // 2️⃣ Admin
      const adminQuery = query(
        collection(db, "Admins"),
        where("adminID", "==", userID),
        where("adminName", "==", userName)
      );
      const adminSnap = await getDocs(adminQuery);

      if (!adminSnap.empty) {
        const admin = adminSnap.docs[0].data();
        navigate("/admin", { state: { admin } });
        return;
      }

      // 3️⃣ CEO
      const ceoQuery = query(
        collection(db, "CEOs"),
        where("ceoID", "==", userID),
        where("ceoName", "==", userName)
      );
      const ceoSnap = await getDocs(ceoQuery);

      if (!ceoSnap.empty) {
        const ceo = ceoSnap.docs[0].data();
        navigate("/ceo", { state: { ceo } });
        return;
      }

      // ❌ Not found
      setError("Invalid ID or Name");
    } catch (err) {
      console.error(err);
      setError("Error connecting to database");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-indigo-700 mb-6 text-center">
          Login
        </h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-semibold mb-1">ID</label>
            <input
              type="text"
              value={userID}
              onChange={(e) => setUserID(e.target.value)}
              className="w-full border p-2 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Name</label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full border p-2 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full bg-indigo-700 text-white p-2 rounded-lg font-semibold hover:bg-indigo-800 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
