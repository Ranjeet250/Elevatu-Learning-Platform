import { useState, useEffect } from "react";
import DashboardLayout from "../components/DashboardLayout";
import {
    Plus,
    Search,
    Edit3,
    Trash2,
    X,
    Save,
    StickyNote,
    BookOpen,
} from "lucide-react";

export default function Notes() {
    const [notes, setNotes] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [showEditor, setShowEditor] = useState(false);
    const [editingNote, setEditingNote] = useState(null);
    const [formData, setFormData] = useState({ title: "", content: "", courseId: "" });

    // Load notes from localStorage for now — will be replaced with API
    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem("elevateNotes") || "[]");
        setNotes(saved);
    }, []);

    const saveToStorage = (updatedNotes) => {
        localStorage.setItem("elevateNotes", JSON.stringify(updatedNotes));
        setNotes(updatedNotes);
    };

    const handleSave = () => {
        if (!formData.title.trim()) return;

        if (editingNote) {
            const updated = notes.map((n) =>
                n.id === editingNote.id
                    ? { ...n, ...formData, updatedAt: new Date().toISOString() }
                    : n
            );
            saveToStorage(updated);
        } else {
            const newNote = {
                id: Date.now().toString(),
                ...formData,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            };
            saveToStorage([newNote, ...notes]);
        }

        resetForm();
    };

    const handleDelete = (id) => {
        const updated = notes.filter((n) => n.id !== id);
        saveToStorage(updated);
    };

    const handleEdit = (note) => {
        setEditingNote(note);
        setFormData({ title: note.title, content: note.content, courseId: note.courseId || "" });
        setShowEditor(true);
    };

    const resetForm = () => {
        setShowEditor(false);
        setEditingNote(null);
        setFormData({ title: "", content: "", courseId: "" });
    };

    const filteredNotes = notes.filter(
        (n) =>
            n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            n.content.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const formatDate = (dateStr) => {
        return new Date(dateStr).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });
    };

    return (
        <DashboardLayout>
            <div className="animate-fadeIn">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-surface-900 mb-1">
                            My Notes
                        </h1>
                        <p className="text-surface-500">
                            {notes.length} {notes.length === 1 ? "note" : "notes"}
                        </p>
                    </div>
                    <button
                        onClick={() => {
                            resetForm();
                            setShowEditor(true);
                        }}
                        className="btn-primary flex items-center gap-2 text-sm"
                    >
                        <Plus className="w-4 h-4" />
                        New Note
                    </button>
                </div>

                {/* Search */}
                {notes.length > 0 && (
                    <div className="relative mb-6">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" />
                        <input
                            type="text"
                            placeholder="Search notes..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="input-field !pl-10 max-w-md"
                        />
                    </div>
                )}

                {/* Editor Modal */}
                {showEditor && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <div
                            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
                            onClick={resetForm}
                        />
                        <div className="relative bg-white rounded-2xl shadow-elevated w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-fadeIn">
                            <div className="flex items-center justify-between p-6 border-b border-surface-100">
                                <h2 className="text-lg font-semibold text-surface-900">
                                    {editingNote ? "Edit Note" : "New Note"}
                                </h2>
                                <button
                                    onClick={resetForm}
                                    className="p-2 rounded-lg hover:bg-surface-100 transition-colors"
                                >
                                    <X className="w-5 h-5 text-surface-500" />
                                </button>
                            </div>

                            <div className="p-6 space-y-5">
                                <div>
                                    <label className="block text-sm font-medium text-surface-700 mb-1.5">
                                        Title
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Note title..."
                                        value={formData.title}
                                        onChange={(e) =>
                                            setFormData({ ...formData, title: e.target.value })
                                        }
                                        className="input-field"
                                        autoFocus
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-surface-700 mb-1.5">
                                        Content
                                    </label>
                                    <textarea
                                        rows={10}
                                        placeholder="Write your notes here... (Markdown supported)"
                                        value={formData.content}
                                        onChange={(e) =>
                                            setFormData({ ...formData, content: e.target.value })
                                        }
                                        className="input-field resize-none font-mono text-sm"
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end gap-3 p-6 border-t border-surface-100">
                                <button onClick={resetForm} className="btn-ghost">
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSave}
                                    disabled={!formData.title.trim()}
                                    className="btn-primary flex items-center gap-2 text-sm disabled:opacity-50"
                                >
                                    <Save className="w-4 h-4" />
                                    {editingNote ? "Save Changes" : "Create Note"}
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Notes Grid */}
                {filteredNotes.length > 0 ? (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredNotes.map((note) => (
                            <div
                                key={note.id}
                                className="card p-5 group hover:shadow-elevated transition-all duration-300"
                            >
                                <div className="flex items-start justify-between mb-3">
                                    <h3 className="font-semibold text-surface-900 text-sm line-clamp-1 flex-1">
                                        {note.title}
                                    </h3>
                                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity ml-2">
                                        <button
                                            onClick={() => handleEdit(note)}
                                            className="p-1.5 rounded-lg hover:bg-surface-100 text-surface-400 hover:text-primary-600"
                                        >
                                            <Edit3 className="w-3.5 h-3.5" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(note.id)}
                                            className="p-1.5 rounded-lg hover:bg-red-50 text-surface-400 hover:text-red-600"
                                        >
                                            <Trash2 className="w-3.5 h-3.5" />
                                        </button>
                                    </div>
                                </div>

                                <p className="text-sm text-surface-500 line-clamp-4 mb-4 leading-relaxed whitespace-pre-wrap">
                                    {note.content || "No content"}
                                </p>

                                <p className="text-xs text-surface-400">
                                    {formatDate(note.updatedAt)}
                                </p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="card text-center py-16">
                        <StickyNote className="w-12 h-12 text-surface-300 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-surface-700 mb-2">
                            {searchQuery ? "No notes found" : "No notes yet"}
                        </h3>
                        <p className="text-surface-500 mb-6">
                            {searchQuery
                                ? "Try a different search term"
                                : "Create your first note to get started"}
                        </p>
                        {!searchQuery && (
                            <button
                                onClick={() => setShowEditor(true)}
                                className="btn-primary text-sm inline-flex items-center gap-2"
                            >
                                <Plus className="w-4 h-4" />
                                Create Note
                            </button>
                        )}
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
}
