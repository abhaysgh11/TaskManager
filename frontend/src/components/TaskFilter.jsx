export default function TaskFilters({search,onSearchCh,filter,onFilterCh }) 
{
    return (
        <div className="task-filters">
        <input
            type="text"
            placeholder="Search tasks_"
            value={search}
            onChange={(e) => onSearchCh(e.target.value)}/>
        <select value={filter} onChange={(e) => onFilterCh(e.target.value)}>
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="pending">Pemding</option>
        </select>
        </div>
    );
}