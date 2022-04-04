import { ReactNode } from 'react';

const PageHeader = ({ title, subtitle, sub2, children }: { title: string, subtitle?: string, sub2?: string, children?: ReactNode }) => {
  return (
    <div className="page-header clearfix">
      <div className="clearfix">
        <h2>{title}</h2>
        <h4>{subtitle && (<small className="text-muted">
          {' '}
          {subtitle}
        </small>)}</h4>
        <h6>{sub2 && (<small className="text-muted">
          {' '}
          {sub2}
        </small>)}</h6>
        {children}
      </div>
      <hr className="colorgraph" />
    </div>
  );
}

export default PageHeader;
