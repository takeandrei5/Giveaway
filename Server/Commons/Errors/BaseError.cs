namespace Giveaway.Commons.Errors;

public abstract class BaseError
{
    public int Status { get; }

    public string Message { get; }

    public abstract string Title { get; }

    public abstract string Type { get; }

    protected BaseError(int status, string message)
    {
        Status = status;
        Message = message;
    }
}
