import SNSTimeline from "~/components/timeline/timeline";

export default function Homepage() {
  return (
    <div>
      <div className="hidden md:block">
        <SNSTimeline type="deck" />
      </div>
      <div className="md:hidden block">
        <SNSTimeline type="default" />
      </div>
    </div>
  );
}
