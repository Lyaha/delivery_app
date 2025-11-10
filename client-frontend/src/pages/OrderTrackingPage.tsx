import { useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { PageTitle } from "../components/ui/PageTitle"
import { getTrackingInfo } from "../services/api"

export default function OrderTrackingPage() {
  const { orderId } = useParams()
  const {
    data: tracking,
    isLoading,
    isError
  } = useQuery({
    queryKey: ["tracking", orderId],
    queryFn: () => getTrackingInfo(orderId!)
  })

  if (isLoading) return <p className="text-center py-10">Загрузка информации...</p>
  if (isError || !tracking) return <p className="text-center py-10 text-red-500">Не удалось загрузить данные.</p>

  return (
    <div className="space-y-6">
      <PageTitle>Статус доставки</PageTitle>
      <div className="border rounded-lg p-4 bg-gray-50">
        <p><strong>Номер заказа:</strong> {tracking.order_id}</p>
        <p><strong>Текущий статус:</strong> {tracking.current_status}</p>
        <p><strong>Курьер:</strong> {tracking.courier_name || "Назначается..."}</p>
      </div>

      <div>
        <h3 className="font-semibold text-lg mb-2">История</h3>
        <ul className="space-y-3">
          {tracking.history.map((event: any) => (
            <li key={event.tracking_id} className="border rounded p-3 bg-white">
              <p className="text-sm text-gray-700">{event.status_type}</p>
              <p className="text-xs text-gray-500">{new Date(event.event_timestamp).toLocaleString()}</p>
              <p className="text-sm">{event.status_description}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}