// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FaPrint } from 'react-icons/fa';
function History({ repairs }) {
    const StartDate = (repair) => {
        if (repair.status == 'Review')
            return ('the start date has not been set yet !')
        else
            return (repair.startDate)
    }
    const EndDate = (repair) => {
        if (repair.status == 'Review')
            return ('the end date has not been set yet !')
        else
            return (repair.endDate)
    }
    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-4">Repair History</h1>
            {repairs.map((repair, index) => (
                <div key={index} className="bg-white shadow overflow-hidden sm:rounded-lg mb-4">
                    <div className="px-4 py-5 sm:px-6">
                        <h2 className="text-lg leading-6 font-medium text-gray-900">{repair.description}</h2>
                    </div>
                    <div className="border-t border-gray-200">
                        <dl>
                        <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
    <dt className="text-sm font-medium text-gray-500">Status</dt>
    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 flex justify-between items-center">
        <span>{repair.status}</span>
        {repair.status === 'completed' && (
            <FaPrint className="ml-2" size={30} />
        )}
    </dd>
</div>
                            <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">Start Date</dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{StartDate(repair)}</dd>
                            </div>
                            <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">End Date</dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{EndDate(repair)}</dd>
                            </div>
                            <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">Notes</dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{repair.clientNotes}</dd>
                            </div>
                        </dl>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default History;