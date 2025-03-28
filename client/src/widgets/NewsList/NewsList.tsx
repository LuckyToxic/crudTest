import { useAppDispatch, useAppSelector } from "../../shared/hooks/reduxHooks"

export default function NewsList() {
    const dispatch = useAppDispatch()
    const news = useAppSelector(state => state.news.news)
    return (
    <div>
        
    </div>
  )
}
